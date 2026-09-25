import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { networkRoutes } from '../routes/network';

describe('P7 - Network routes', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify();
    await app.register(networkRoutes);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/network/lan-addresses returns addresses array', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/network/lan-addresses' });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.payload);
    expect(data).toHaveProperty('addresses');
    expect(Array.isArray(data.addresses)).toBe(true);
  });

  it('GET /api/network/qrcode returns SVG', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/network/qrcode?url=http://localhost:3000',
    });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('image/svg+xml');
    expect(res.payload).toContain('<svg');
  });

  it('GET /api/network/qrcode returns 400 without url', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/network/qrcode' });
    expect(res.statusCode).toBe(400);
  });
});
