import { objectType, stringArg, intArg, nonNull } from 'nexus';

export const Hole = objectType({
  name: 'Hole',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('index');
    t.nonNull.int('number');
    t.nonNull.int('par');
    t.nonNull.int('courseId');
  },
});

export const Course = objectType({
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

export const allCourses = (t) => {
  return t.nonNull.list.nonNull.field('allCourses', {
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
};
