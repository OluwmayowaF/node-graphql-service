import { GraphQLSchema } from 'graphql';

import { RootQuery } from './root.query';
import { Mutation } from './mutation';

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
