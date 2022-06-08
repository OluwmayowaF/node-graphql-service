import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import FirestoreProcessor from '../setup/firestore-processor';
import { GraphQLDateTime } from 'graphql-iso-date';
const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    zip: { type: GraphQLInt },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    uid: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    uid: { type: GraphQLID },
    address: { type: AddressType },
    bookingDate: { type: GraphQLDateTime, resolve: (args) => new Date(args.bookingDate) },
    title: { type: GraphQLString },
    customer: {
      type: UserType,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    order: {
      type: OrderType,
      args: { uid: { type: GraphQLID } },
      resolve(parent, args) {
        return FirestoreProcessor.getDataById('orders', args.uid);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
