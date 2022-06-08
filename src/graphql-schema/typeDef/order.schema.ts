import {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
});
export const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

export const CustomerInputType = new GraphQLInputObjectType({
  name: 'CustomerInput',
  fields: () => ({
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

export const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    zip: { type: GraphQLInt },
  }),
});

export const AddressInputType = new GraphQLInputObjectType({
  name: 'AddressInput',
  fields: () => ({
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    zip: { type: GraphQLInt },
  }),
});

export const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    uid: { type: GraphQLID },
    address: { type: AddressType },
    bookingDate: { type: DateTime },
    title: { type: GraphQLString },
    customer: {
      type: CustomerType,
    },
  }),
});
