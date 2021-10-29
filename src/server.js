import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server';
import schema from './schema.js';
import context from './context.js';

const server = new ApolloServer({ schema, context });

server.listen().then(async ({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
