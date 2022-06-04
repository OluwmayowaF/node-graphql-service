import config from 'config';
import  express from "express";
import { graphqlHTTP } from "express-graphql"
import initDatabase from './setup/database';
import { schema } from './_core/graphql-schema';
import { root } from './_core/graphql-resolver';

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
initDatabase()
    .then( async () => {
     await app.listen(config.get('app.port'));
     console.log(`\n
	\tApplication listening on ${config.get('app.baseUrl')}:${config.get('app.port')}\n
	\tEnvironment => ${config.util.getEnv('NODE_ENV')}: \n
	\tDate: ${new Date()}`)
    },  (err) => {
      console.log('There was an uncaught error');
      console.error(err);
  },)