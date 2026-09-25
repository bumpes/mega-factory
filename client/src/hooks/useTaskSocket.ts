import { useEffect, useRef, useCallback, useState } from 'react';
import { getWsUrl } from '../api/config';

export interface WsEvent {
  event: string;
  data: unknown;
}

export function useTaskSocket(onEvent?: (e: WsEvent) => void) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = getWsUrl();
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => setConnected(true);
    ws.onclose = () => {
      setConnected(false);
      setTimeout(connect, 3000);
    };
    ws.onerror = () => ws.close();
    ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data) as WsEvent;
        onEventRef.current?.(event);
      } catch {
        // ignore
      }
    };

    wsRef.current = ws;
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [connect]);

  return { connected };
}
