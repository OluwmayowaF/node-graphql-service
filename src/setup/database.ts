import log from '../utils/logger';
import firebaseAdmin, { AppOptions } from 'firebase-admin';
import config from 'config';
import path from 'path';

export default async function () {
  try {
    const serviceAccount = path.resolve(__dirname, config.get('databases.firestore.credentialsPath'));

    console.log('Connecting to firestore...');
    let firebaseConfig: AppOptions;
    console.log(config.get('app.environment'));
    if (config.get('app.environment') !== 'production') {
      firebaseConfig = {
        projectId: config.get('databases.firestore.projectId'),
      };
    } else {
      firebaseConfig = {
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: config.get('databases.firestore.url'),
      };
    }
    firebaseAdmin.initializeApp(firebaseConfig);
    const db = firebaseAdmin.firestore();
    log.debug(`Firestore loaded - url - ${config.get('databases.firestore.url')}`);
    return db;
  } catch (err) {
    log.error(err);
    throw err;
  }
}
