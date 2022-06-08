/**
 * Firestore Handler Processor Class
 */
import firestoredb from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

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
      obj.uid = uuidv4();
      obj.bookingDate = Math.floor(new Date().getTime() / 1000);

      const data = await db.collection(collection).add(obj);

      if (!data) return null;

      return data;
    } catch (e) {
      throw e;
    }
  },

  async getAllData(collection: string, args?: any) {
    try {
      const db = firestoredb.firestore();

      const data = await db.collection(collection).get();
      if (data.empty) return null;
      return data.docs.map((doc) => doc.data());
    } catch (e) {
      throw e;
    }
  },
};

export default FirestoreProcessor;
