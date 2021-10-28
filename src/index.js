import dotenv from 'dotenv';
dotenv.config();

import Hapi from '@hapi/hapi';
import prisma from './plugins/prisma.js';
import players from './plugins/players.js';
import courses from './plugins/courses.js';

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
});

export async function start() {
  await server.register([prisma, players, courses]);
  await server.start();
  return server;
}

process.on('unhandledRejection', async (err) => {
  await server.app.prisma.$disconnect();
  console.log(err);
  process.exit(1);
});

start()
  .then((server) => {
    console.log(`🚀 Server ready at: ${server.info.uri}`);
  })
  .catch((err) => {
    console.log(err);
  });
