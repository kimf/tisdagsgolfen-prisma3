import { objectType, inputObjectType, nonNull, arg } from 'nexus';

export const PlayerCreateInput = inputObjectType({
  name: 'PlayerCreateInput',
  definition(t) {
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
  },
});

export const allPlayers = (t) => {
  return t.nonNull.list.nonNull.field('allPlayers', {
    type: 'Player',
    resolve: (_parent, _args, context) => {
      return context.prisma.player.findMany();
    },
  });
};

export const createPlayer = (t) => {
  return t.nonNull.field('createPlayer', {
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
};

export const Player = objectType({
  name: 'Player',
  definition(t) {
    t.nonNull.int('id');
    t.string('firstName');
    t.string('lastName');
    t.string('photo');
  },
});
