import FirestoreProcessor from '../setup/firestore-processor';
export const root = {
  message: () => 'Hello World!',
  order: (args: any) => FirestoreProcessor.getDataById('orders', args.uid),
};
