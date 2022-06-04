import log from '../utils/logger';
import firebaseAdmin from 'firebase-admin';
import config from 'config';
var path = require("path");

const serviceAccount = path.resolve(__dirname, '../../service-account-credentials.json')

export default () => {

  const connect = async function() {
    try {
      console.log('Connecting to firestore...')
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: config.get('databases.firestore.url')
      })
      const db = firebaseAdmin.firestore();
      log.debug(`Firestore loaded - url - ${config.get('databases.firestore.url')}`);
      return db;
    } catch (err) {
      log.error(err)
      throw err
    }
  }
  return connect();

}