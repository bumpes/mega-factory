import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import TaskPage from '../pages/TaskPage';

const mockTasks = [
  { id: 't1', created_at: new Date().toISOString(), status: 'completed', params_json: '{}' },
];

const mockCreations = [
  { id: 'c1', name: '戴森球核心', category: '恒星工程', source: 'preset', setting_desc: 'desc', copywriting_md: 'md', prompt: 'p', style_tag: '硬科幻', created_at: new Date().toISOString() },
  { id: 'c2', name: '环形世界', category: '壳世界', source: 'preset', setting_desc: 'desc', copywriting_md: 'md', prompt: 'p', style_tag: '太空歌剧', created_at: new Date().toISOString() },
];

const mockTaskImages = [
  { id: 'i1', task_id: 't1', creation_id: 'c1', status: 'done', file_path: '/tmp/test.png', prompt_snapshot: 'p', error: '', elapsed_ms: 30000 },
];

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/api/tasks') && url.includes('/images')) {
      return new Response(JSON.stringify(mockTaskImages), { status: 200 });
    }
    if (url.includes('/api/tasks') && !url.includes('/images')) {
      return new Response(JSON.stringify(mockTasks), { status: 200 });
    }
    if (url.includes('/api/creations')) {
      return new Response(JSON.stringify(mockCreations), { status: 200 });
    }
    if (url.includes('/ws')) {
      return new Response('', { status: 400 });
    }
    return new Response(JSON.stringify({}), { status: 200 });
  };
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

function renderPage() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>
        <TaskPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('P3 - TaskPage', () => {
  it('renders page title', () => {
    renderPage();
    expect(screen.getByText('生成任务')).toBeTruthy();
  });

  it('shows start task button', () => {
    renderPage();
    expect(screen.getByTestId('start-task-btn')).toBeTruthy();
  });

  it('shows creation selection list', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('戴森球核心')).toBeTruthy();
    });
  });

  it('shows task history', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('任务历史')).toBeTruthy();
    });
  });

  it('shows image count and estimated time', () => {
    renderPage();
    expect(screen.getByText(/预计耗时/)).toBeTruthy();
  });
});
