import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { makeSchema, objectType, asNexusMethod } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';

import { allCourses, Course, Hole } from './schema/courses.js';
import { allPlayers, createPlayer, Player, PlayerCreateInput } from './schema/players.js';

const DateTime = asNexusMethod(DateTimeResolver, 'date');

const Query = objectType({
  name: 'Query',
  definition(t) {
    allPlayers(t);
    allCourses(t);
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    createPlayer(t);
  },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

const schema = makeSchema({
  types: [Query, Mutation, Course, Hole, Player, PlayerCreateInput, DateTime],
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

export default schema;
