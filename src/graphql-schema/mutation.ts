import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import FirestoreProcessor from '../setup/firestore-processor';

const { insertData, deleteDataById, findAndDeleteDocuments } = FirestoreProcessor;
import { DateTime, OrderType, AddressInputType, CustomerInputType } from './typeDef/order.schema';
import { UserType } from './typeDef/user.schema';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return insertData('users', args);
      },
    },

    addOrder: {
      type: OrderType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        bookingDate: { type: new GraphQLNonNull(DateTime) },
        address: { type: new GraphQLNonNull(AddressInputType) },
        customer: { type: new GraphQLNonNull(CustomerInputType) },
      },
      resolve(parent, args) {
        return insertData('orders', args);
      },
    },

    deleteOrder: {
      type: OrderType,
      args: {
        uid: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.email) {
          return findAndDeleteDocuments('orders', 'customer.email', args.email);
        }
        if (args.uid) {
          return deleteDataById('orders', args.uid);
        }
      },
    },
  },
});
