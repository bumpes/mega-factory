import { FastifyPluginAsync } from 'fastify';
import {
  createTask, startTask, cancelTask, retryImage,
  listTasks, getTask, getTaskImages, isProcessing,
  type TaskParams,
} from '../services/generator';

export const tasksRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/tasks', async () => {
    return listTasks();
  });

  fastify.get<{ Params: { id: string } }>('/api/tasks/:id', async (request, reply) => {
    const task = getTask(request.params.id);
    if (!task) return reply.code(404).send({ error: 'Not found' });
    return task;
  });

  fastify.get<{ Params: { id: string } }>('/api/tasks/:id/images', async (request, reply) => {
    return getTaskImages(request.params.id);
  });

  fastify.post('/api/tasks', async (request, reply) => {
    const body = request.body as TaskParams & { autoStart?: boolean };
    if (!body.creationIds?.length) {
      return reply.code(400).send({ error: 'creationIds is required' });
    }
    if (isProcessing()) {
      return reply.code(409).send({ error: 'A task is already running' });
    }

    const { task, images } = createTask({
      creationIds: body.creationIds,
      imagesPerCreation: body.imagesPerCreation || 1,
      width: body.width || 1024,
      height: body.height || 1024,
      promptOverride: body.promptOverride,
    });

    if (body.autoStart !== false) {
      startTask(task.id).catch((err) => {
        fastify.log.error(err);
      });
    }

    return reply.code(201).send({ task, images });
  });

  fastify.post<{ Params: { id: string } }>('/api/tasks/:id/cancel', async (request) => {
    cancelTask(request.params.id);
    return { ok: true };
  });

  fastify.post<{ Params: { imageId: string } }>('/api/task-images/:imageId/retry', async (request) => {
    retryImage(request.params.imageId);
    return { ok: true };
  });
};
