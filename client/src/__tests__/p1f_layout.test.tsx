import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from '../layouts/AppLayout';

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

function renderLayout(route = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <AppLayout />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('P1f - Layout navigation', () => {
  it('renders desktop sidebar with 7 nav items', () => {
    renderLayout();
    const expectedItems = ['工作台', '创意库', '生成任务', '作品库', '比较工作台', '参考图库', '设置'];
    for (const label of expectedItems) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders mobile bottom tab with 5 items', () => {
    renderLayout();
    const expectedMobile = ['工作台', '创意库', '生成', '作品库', '我的'];
    for (const label of expectedMobile) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('desktop sidebar links point to correct paths', () => {
    renderLayout();
    const expectedPaths = ['/', '/creations', '/task', '/gallery', '/compare', '/reference', '/settings'];
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    for (const p of expectedPaths) {
      expect(hrefs).toContain(p);
    }
  });

  it('highlights active nav item based on current route', () => {
    renderLayout('/settings');
    const settingsLinks = screen.getAllByText('设置');
    const settingsLink = settingsLinks.find((el) => el.closest('a'));
    expect(settingsLink).toBeDefined();
    const anchor = settingsLink!.closest('a');
    expect(anchor?.className).toContain('bg-blue-600');
  });

  it('renders app title in sidebar', () => {
    renderLayout();
    expect(screen.getAllByText('巨构工厂').length).toBeGreaterThanOrEqual(1);
  });
});
