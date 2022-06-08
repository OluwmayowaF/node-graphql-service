import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import FirestoreProcessor from '../setup/firestore-processor';

const {
  getAllData,
  getDataById,
  insertData,
  findDocument,
  deleteDataById,
  findDocumentsWithinRange,
  deleteDocuments,
} = FirestoreProcessor;
import { DateTime, OrderType, AddressInputType, CustomerInputType } from './order.schema';

const RootQuery = new GraphQLObjectType({
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
    // users: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent, args) {
    //     return getAllData('users');
    //   },
    // },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // addUser: {
    //   type: UserType,
    //   args: {
    //     email: { type: GraphQLString },
    //     name: { type: GraphQLString },
    //     phone: { type: GraphQLString },
    //   },
    //   resolve(parent, args) {
    //     return insertData('users', args);
    //   },
    // },

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
      },
      resolve(parent, args) {
        return deleteDataById('orders', args.uid);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
