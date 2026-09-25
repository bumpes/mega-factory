import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import multipart from '@fastify/multipart';
import path from 'path';
import fs from 'fs';
import { WebSocketServer, type WebSocket } from 'ws';
import { initDb } from './db/sqlite';
import { settingsRoutes } from './routes/settings';
import { creationsRoutes } from './routes/creations';
import { tasksRoutes } from './routes/tasks';
import { galleryRoutes } from './routes/gallery';
import { referencesRoutes } from './routes/references';
import { compareRoutes } from './routes/compare';
import { dashboardRoutes } from './routes/dashboard';
import { networkRoutes } from './routes/network';
import { seedIfEmpty } from './services/creations';
import { addClient, removeClient } from './services/wsHub';

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true });

const clientDist = path.resolve(import.meta.dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  await fastify.register(fastifyStatic, {
    root: clientDist,
    prefix: '/',
  });
}

fastify.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

await fastify.register(settingsRoutes);
await fastify.register(creationsRoutes);
await fastify.register(tasksRoutes);
await fastify.register(galleryRoutes);
await fastify.register(multipart);
await fastify.register(referencesRoutes);
await fastify.register(compareRoutes);
await fastify.register(dashboardRoutes);
await fastify.register(networkRoutes);

if (fs.existsSync(clientDist)) {
  fastify.setNotFoundHandler(async (_request, reply) => {
    return reply.sendFile('index.html');
  });
}

const start = async () => {
  try {
    await initDb();
    fastify.log.info('Database initialized');
    const seeded = await seedIfEmpty();
    if (seeded > 0) fastify.log.info(`Seeded ${seeded} preset creations`);
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on http://0.0.0.0:${port}`);

    const wss = new WebSocketServer({ server: fastify.server, path: '/ws' });
    wss.on('connection', (ws: WebSocket) => {
      addClient(ws as any);
      ws.on('close', () => removeClient(ws as any));
    });
    fastify.log.info('WebSocket server ready on /ws');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
