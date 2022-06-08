/**
 * Firestore Handler Processor Class
 */
import firestoredb from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { autoId } from '@google-cloud/firestore/build/src/util';

const FirestoreProcessor = {
  /**
   * @param {collection} collection
   * @param {db} firestoreDb
   * @return {Object}
   */
  async getDataById(collection: string, id: any) {
    try {
      const db = firestoredb.firestore();

      const data = await db.collection(collection).doc(id).get();

      if (!data) return null;

      return data.data();
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
      const db = firestoredb.firestore();
      obj.uid = autoId();

      // Enforce Unique User Email
      if (collection == 'users') {
        const exists = await db.collection(collection).where('email', '==', obj.email).get();
        if (exists.docs.length > 0) {
          // Do not allow creation
          throw new Error('User with that email already exists');
        }
      }

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
      const db = firestoredb.firestore();

      const data = await db.collection(collection).get();
      if (data.empty) return [];
      return data.docs.map((doc) => doc.data());
    } catch (e) {
      throw e;
    }
  },

  async findDocument(collection: string, searchKey: string, searchValue: string) {
    try {
      const db = firestoredb.firestore();

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
      const db = firestoredb.firestore();

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
      const db = firestoredb.firestore();

      const data = await db.collection(collection).doc(id).get();

      if (!data) return null;

      return data.ref.delete();
    } catch (e) {
      throw e;
    }
  },

  async findAndDeleteDocuments(collection: string, searchKey: string, searchValue: string): Promise<any> {
    try {
      const db = firestoredb.firestore();

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
