import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
} from 'nexus';

import { DateTimeResolver } from 'graphql-scalars';

const DateTime = asNexusMethod(DateTimeResolver, 'date');

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allPlayers', {
      type: 'Player',
      resolve: (_parent, _args, context) => {
        return context.prisma.player.findMany();
      },
    });

    t.nonNull.list.nonNull.field('allCourses', {
      type: 'Course',
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve: (_parent, args, context) => {
        const or = args.searchString
          ? {
              OR: [
                { name: { contains: args.searchString } },
                { club: { contains: args.searchString } },
              ],
            }
          : {};

        return context.prisma.course.findMany({
          where: {
            ...or,
          },
          take: args.take || undefined,
          skip: args.skip || undefined,
        });
      },
    });

    // t.list.field('draftsByUser', {
    //   type: 'Post',
    //   args: {
    //     userUniqueInput: nonNull(
    //       arg({
    //         type: 'UserUniqueInput',
    //       }),
    //     ),
    //   },
    //   resolve: (_parent, args, context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: {
    //           id: args.userUniqueInput.id || undefined,
    //           email: args.userUniqueInput.email || undefined,
    //         },
    //       })
    //       .posts({
    //         where: {
    //           published: false,
    //         },
    //       });
    //   },
    // });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createPlayer', {
      type: 'Player',
      args: {
        data: nonNull(
          arg({
            type: 'PlayerCreateInput',
          }),
        ),
      },
      resolve: (_, args, context) => {
        const { firstName, lastName } = args.data;
        return context.prisma.player.create({
          data: { firstName, lastName },
        });
      },
    });
  },
});

const Player = objectType({
  name: 'Player',
  definition(t) {
    t.nonNull.int('id');
    t.string('firstName');
    t.string('lastName');
    t.string('photo');
  },
});

const Hole = objectType({
  name: 'Hole',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('index');
    t.nonNull.int('number');
    t.nonNull.int('par');
    t.nonNull.int('courseId');
  },
});

const Course = objectType({
  name: 'Course',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('club');
    t.nonNull.string('name');
    t.nonNull.int('par');
    t.nonNull.list.nonNull.field('holes', {
      type: 'Hole',
      resolve: (parent, _, context) => {
        return context.prisma.course
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .holes();
      },
    });
  },
});

const PlayerCreateInput = inputObjectType({
  name: 'PlayerCreateInput',
  definition(t) {
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
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
