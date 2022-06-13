import log from '../utils/logger';
import firebaseAdmin, { AppOptions } from 'firebase-admin';
import config from 'config';
import path from 'path';
const serviceAccount = path.resolve(__dirname, './../../serviceAccountKey.json');

export default async function () {
  try {
    console.log('Connecting to firestore...');
    let firebaseConfig: AppOptions;
    console.log(config.get('app.environment'));
    if (config.get('app.environment') !== 'production') {
      firebaseConfig = {
        projectId: config.get('databases.firestore.projectId'),
      };
    } else {
      console.log('PRODUCTION')
      firebaseConfig = {
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: config.get('databases.firestore.url'),
      };
    }
    firebaseAdmin.initializeApp(firebaseConfig);
    const db = firebaseAdmin.firestore();
    console.log(db)
    log.debug(`Firestore loaded - url - ${config.get('databases.firestore.url')}`);
    return db;
  } catch (err) {
    log.error(err);
    throw err;
  }
}
