async function getAllPlayersHandler(request, h) {
  const { prisma } = request.server.app;

  try {
    const players = await prisma.player.findMany();
    return h.response(players).code(200);
  } catch (err) {
    console.log(err);
  }
}

const usersPlugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function (server) {
    server.route([
      {
        method: 'GET',
        path: '/players',
        handler: getAllPlayersHandler,
      },
    ]);
  },
};

export default usersPlugin;
