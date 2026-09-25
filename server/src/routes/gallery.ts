import { FastifyPluginAsync } from 'fastify';
import { scanArchiveTree, listBatch, readTextFile, getOutputDir } from '../services/gallery';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export const galleryRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/gallery', async () => {
    return scanArchiveTree();
  });

  fastify.get<{ Params: { creationName: string; date: string } }>(
    '/api/gallery/:creationName/:date',
    async (request, reply) => {
      const { creationName, date } = request.params;
      const batch = listBatch(creationName, date);
      if (!batch) return reply.code(404).send({ error: 'Batch not found' });
      return batch;
    }
  );

  fastify.get<{ Params: { creationName: string; date: string; filename: string } }>(
    '/api/gallery/:creationName/:date/:filename',
    async (request, reply) => {
      const { creationName, date, filename } = request.params;
      const content = readTextFile(creationName, date, filename);
      if (content === null) return reply.code(404).send({ error: 'File not found' });
      return { content };
    }
  );

  fastify.get('/api/gallery/image', async (request, reply) => {
    const { path: imgPath } = request.query as { path?: string };
    if (!imgPath) return reply.code(400).send({ error: 'path required' });
    const resolved = path.resolve(imgPath);
    const outputDir = path.resolve(getOutputDir());
    if (!resolved.startsWith(outputDir)) return reply.code(403).send({ error: 'forbidden' });
    if (!fs.existsSync(resolved)) return reply.code(404).send({ error: 'Not found' });
    const ext = path.extname(resolved).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
    };
    reply.header('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    const stream = fs.createReadStream(resolved);
    return reply.send(stream);
  });

  fastify.post('/api/gallery/zip', async (request, reply) => {
    const { paths } = request.body as { paths: string[] };
    if (!paths?.length) return reply.code(400).send({ error: 'paths required' });

    reply.header('Content-Type', 'application/zip');
    reply.header('Content-Disposition', 'attachment; filename="gallery.zip"');

    const archive = archiver('zip', { zlib: { level: 5 } });
    archive.on('error', (err: Error) => { throw err; });

    const outputDir = path.resolve(getOutputDir());
    for (const p of paths) {
      const resolved = path.resolve(p);
      if (!resolved.startsWith(outputDir)) continue;
      if (fs.existsSync(resolved)) {
        archive.file(resolved, { name: path.basename(resolved) });
      }
    }

    archive.finalize();
    return reply.send(archive);
  });
};
