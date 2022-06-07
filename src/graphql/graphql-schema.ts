import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  scalar Date

  type Address {
    city: String!
    country: String!
    street: String!
    zip: Int!
    }
    
    type Order  {
      address: Address!
      bookingDate: String!
      customer: User!
      title: String!
      uid: ID!
      createdAt: Date
      updatedAt: Date
    }

    type User  {
      email: String!
      name: String!
      phone: String
      uid: ID!
      createdAt: Date
      updatedAt: Date
    }

    type Query {
      order(uid: ID!): Order!
    },
`);
