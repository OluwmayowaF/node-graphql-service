/**
 * Firestore Handler Processor Class
 */
import firestoredb from 'firebase-admin';

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
};

export default FirestoreProcessor;
