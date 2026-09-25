import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';

let originalFetch: typeof globalThis.fetch;
let originalWebSocket: typeof globalThis.WebSocket;

const mockDashboard = {
  comfyStatus: 'offline' as const,
  comfyError: 'connection refused',
  creationCount: 3,
  pendingComparisonCount: 2,
  recentImages: [],
  recentComparisons: [],
  runningTasks: [],
};

class MockWebSocket {
  static OPEN = 1;
  readyState = 1;
  onopen: (() => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onmessage: ((msg: { data: string }) => void) | null = null;
  constructor() {
    setTimeout(() => this.onopen?.(), 0);
  }
  close() { this.readyState = 3; }
  send() {}
}

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/api/dashboard')) {
      return new Response(JSON.stringify(mockDashboard), { status: 200 });
    }
    return new Response(JSON.stringify({}), { status: 200 });
  };
  originalWebSocket = globalThis.WebSocket;
  (globalThis as any).WebSocket = MockWebSocket;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
  (globalThis as any).WebSocket = originalWebSocket;
});

describe('P6 - DashboardPage', () => {
  it('renders dashboard title', async () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText('工作台')).toBeTruthy();
    });
  });

  it('shows new task button', async () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByTestId('new-task-btn')).toBeTruthy();
    });
  });

  it('shows status cards with counts', async () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByTestId('status-cards')).toBeTruthy();
    });
  });

  it('shows running tasks section', async () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getAllByText('运行中任务').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('shows recent sections', async () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText('最近生成')).toBeTruthy();
      expect(screen.getByText('最近比较')).toBeTruthy();
    });
  });
});
