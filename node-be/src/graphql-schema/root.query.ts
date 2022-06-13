import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import FirestoreProcessor from '../setup/firestore-processor';

const { getAllData, getDataById, findDocument, findDocumentsWithinRange } = FirestoreProcessor;
import { DateTime, OrderType } from './typeDef/order.schema';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    order: {
      type: OrderType,
      args: { uid: { type: GraphQLID } },
      resolve(parent, args) {
        return getDataById('orders', args.uid);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      args: {
        email: { type: GraphQLString },
        fromDate: { type: DateTime },
        toDate: { type: DateTime },
      },
      resolve(parent, args) {
        if (args.email) {
          return findDocument('orders', 'customer.email', args.email);
        }
        if (args.fromDate && args.toDate) {
          return findDocumentsWithinRange('orders', 'bookingDate', args.fromDate, args.toDate);
        }
        return getAllData('orders');
      },
    },
  },
});
