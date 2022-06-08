import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import FirestoreProcessor from '../setup/firestore-processor';
import { GraphQLDateTime } from 'graphql-iso-date';

const { getAllData, getDataById, insertData, findDocument } = FirestoreProcessor;
// Create a new order in the orders collection. It should accept the title, bookingDate, address and customer fields.
const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    zip: { type: GraphQLInt },
  }),
});

const AddressInputType = new GraphQLInputObjectType({
  name: 'AddressInput',
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
    bookingDate: { type: GraphQLInt /*, resolve: (args) => new Date(args.bookingDate)*/ },
    title: { type: GraphQLString },
    customer: {
      type: UserType,
      resolve(parent, args) {
        return getDataById('users', parent.customerId);
      },
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
        return getDataById('orders', args.uid);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      args: {
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.email) {
          return findDocument('users', 'email', args.email).then((users: any) => {
            console.log(users);
            return findDocument('orders', 'customerId', users[2]?.uid);
          });
        }
        return getAllData('orders');
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return getAllData('users');
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
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
        uid: { type: GraphQLID },
        address: { type: AddressInputType },
        title: { type: GraphQLString },
        customerId: { type: GraphQLID },
      },
      resolve(parent, args) {
        args.bookingDate = Math.round(new Date().getTime() / 1000).toString();
        return insertData('orders', args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
