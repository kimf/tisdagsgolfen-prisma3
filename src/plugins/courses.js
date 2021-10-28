async function coursesHandler(request, h) {
  const { prisma } = request.server.app;

  try {
    const courses = await prisma.course.findMany({
      include: { holes: true },
    });

    return h.response(courses).code(200);
  } catch (err) {
    console.log(err);
  }
}

async function createCourseHandler(request, h) {
  const { prisma } = request.server.app;

  const payload = request.payload;

  try {
    const createdCourse = await prisma.course.create({
      data: {
        name: payload.name,
      },
    });
    return h.response(createdCourse).code(201);
  } catch (err) {
    console.log(err);
  }
}

const coursesPlugin = {
  name: 'app/posts',
  dependencies: ['prisma'],
  register: async function (server) {
    server.route([
      {
        method: 'POST',
        path: '/courses',
        handler: createCourseHandler,
      },
    ]);

    server.route([
      {
        method: 'GET',
        path: '/courses',
        handler: coursesHandler,
      },
    ]);
  },
};

export default coursesPlugin;
