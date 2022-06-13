/**
 * Firestore Handler Processor Class
 */
import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { autoId } from '@google-cloud/firestore/build/src/util';

const FirestoreProcessor = {
  /**
   * @param {collection} collection
   * @param {db} admin
   * @return {Object}
   */
  async getDataById(collection: string, id: any) {
    try {
      const db = admin.firestore();

      const data = await db.collection(collection).doc(id).get();
      // console.log(data.id, d)
      // if (!data) return null;

      return data?.data();
    } catch (e) {
      throw e;
    }
  },

  /**
   *
   * @param collection
   * @param id
   * @param obj
   * @returns
   */

  async insertData(collection: string, obj: any) {
    try {
      const db = admin.firestore();
      obj.uid = autoId();

      
      const data = await db.collection(collection).doc(obj.uid).set(obj);

      if (!data) return null;

      const result = await db.collection(collection).doc(obj.uid).get();

      return result.data();
    } catch (e) {
      throw e;
    }
  },

  async getAllData(collection: string, args?: any) {
    try {
      const db = admin.firestore();

      const data = await db.collection(collection).get();
      if (data.empty) return [];
      return data.docs.map((doc) => doc.data());
    } catch (e) {
      throw e;
    }
  },

  async findDocument(collection: string, searchKey: string, searchValue: string) {
    try {
      const db = admin.firestore();

      const data = db.collection(collection);

      const snapshot = await data.where(searchKey, '==', searchValue).get();

      if (snapshot.empty) return [];

      return snapshot.docs.map((doc) => doc.data());
    } catch (e) {
      throw e;
    }
  },

  async findDocumentsWithinRange(collection: string, searchKey: string, startValue: string, endValue: string) {
    try {
      const db = admin.firestore();

      const data = db.collection(collection);

      const snapshot = await data.where(searchKey, '>=', startValue).where(searchKey, '<=', endValue).get();

      if (snapshot.empty) return [];

      return snapshot.docs.map((doc) => doc.data());
    } catch (e) {
      throw e;
    }
  },

  async deleteDataById(collection: string, id: any) {
    try {
      const db = admin.firestore();

      const data = await db.collection(collection).doc(id).delete();

      return data;
    } catch (e) {
      throw e;
    }
  },

  async findAndDeleteDocuments(collection: string, searchKey: string, searchValue: string): Promise<any> {
    try {
      const db = admin.firestore();

      const data = db.collection(collection);

      const snapshot = await data.where(searchKey, '==', searchValue).get();

      if (snapshot.empty) return null;

      snapshot.docs.forEach((snaps) => {
        snaps.ref.delete();
      });
      return null;
    } catch (e) {
      throw e;
    }
  },
};

export default FirestoreProcessor;
