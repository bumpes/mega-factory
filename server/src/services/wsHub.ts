import type { WebSocket } from 'ws';

type WsClient = WebSocket & { id: string };

const clients = new Set<WsClient>();
let nextId = 1;

export function addClient(ws: WsClient): void {
  ws.id = String(nextId++);
  clients.add(ws);
}

export function removeClient(ws: WsClient): void {
  clients.delete(ws);
}

export function broadcast(event: string, data: unknown): void {
  const msg = JSON.stringify({ event, data });
  for (const ws of clients) {
    try {
      if (ws.readyState === 1) { // OPEN
        ws.send(msg);
      }
    } catch {
      // ignore
    }
  }
}

export function getClientCount(): number {
  return clients.size;
}
