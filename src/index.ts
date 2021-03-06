import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './generated/type-graphql';
import { context } from './context';

const app = async () => {
  const schema = await tq.buildSchema({ resolvers });

  new ApolloServer({ schema, context: context }).listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`đ Server ready at: http://localhost:4000\nâ­ď¸`),
  );
};

app();
