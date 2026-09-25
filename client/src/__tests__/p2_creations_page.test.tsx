import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import CreationsPage from '../pages/CreationsPage';

const mockCreations = [
  {
    id: 'c1', name: '戴森球核心', category: '恒星工程', source: 'preset',
    setting_desc: '包裹整颗恒星的巨型能量收集结构', copywriting_md: '测试文案',
    prompt: 'colossal Dyson sphere, overwhelming epic scale, megastructure', style_tag: '硬科幻',
    created_at: new Date().toISOString(),
  },
  {
    id: 'c2', name: 'AI创意测试', category: '轨道巨构', source: 'ai',
    setting_desc: 'AI生成的创意', copywriting_md: 'AI文案',
    prompt: 'megastructure epic scale test', style_tag: '太空歌剧',
    created_at: new Date().toISOString(),
  },
];

const mockCategories = ['恒星工程', '轨道巨构', '壳世界'];

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/api/creations/categories')) {
      return new Response(JSON.stringify(mockCategories), { status: 200 });
    }
    if (url.includes('/api/creations')) {
      return new Response(JSON.stringify(mockCreations), { status: 200 });
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
        <CreationsPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('P2 - CreationsPage', () => {
  it('renders page title', async () => {
    renderPage();
    expect(screen.getByText('创意库')).toBeTruthy();
  });

  it('shows creation cards after loading', async () => {
    renderPage();
    await waitFor(() => {
      const cards = screen.getAllByTestId('creation-card');
      expect(cards.length).toBe(2);
    });
  });

  it('shows NEW badge for recent AI creations', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('NEW')).toBeTruthy();
    });
  });

  it('shows AI generate button', () => {
    renderPage();
    expect(screen.getByTestId('ai-generate-btn')).toBeTruthy();
  });

  it('shows search input and category filter', () => {
    renderPage();
    expect(screen.getByTestId('search-input')).toBeTruthy();
    expect(screen.getByTestId('category-filter')).toBeTruthy();
  });

  it('shows total count', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('共 2 条创意')).toBeTruthy();
    });
  });

  it('opens drawer on card click', async () => {
    renderPage();
    await waitFor(() => {
      const cards = screen.getAllByTestId('creation-card');
      fireEvent.click(cards[0]);
    });
    await waitFor(() => {
      expect(screen.getByTestId('creation-drawer')).toBeTruthy();
    });
  });
});
