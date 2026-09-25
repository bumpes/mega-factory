import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GalleryPage from '../pages/GalleryPage';

const mockTree = [
  { creationName: '戴森球', dates: ['2026-01-15', '2026-02-20'] },
  { creationName: '环形世界', dates: ['2026-03-01'] },
];

const mockBatch = {
  creationName: '戴森球',
  date: '2026-01-15',
  dirPath: '/output/戴森球/2026-01-15',
  images: [
    { filename: 'img1.png', filePath: '/output/戴森球/2026-01-15/img1.png', compared: false },
    { filename: 'img2.png', filePath: '/output/戴森球/2026-01-15/img2.png', compared: true, totalScore: 35 },
  ],
  hasPrompt: true,
  hasCopywriting: true,
};

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/api/gallery/image')) {
      return new Response('fake-image', { status: 200, headers: { 'Content-Type': 'image/png' } });
    }
    if (url.match(/\/api\/gallery\/[^/]+\/[^/]+\/提示词/)) {
      return new Response(JSON.stringify({ content: 'megastructure prompt text' }), { status: 200 });
    }
    if (url.match(/\/api\/gallery\/[^/]+\/[^/]+\/文案/)) {
      return new Response(JSON.stringify({ content: '# 文案内容' }), { status: 200 });
    }
    if (url.match(/\/api\/gallery\/[^/]+\/[^/]+$/)) {
      return new Response(JSON.stringify(mockBatch), { status: 200 });
    }
    if (url.endsWith('/api/gallery')) {
      return new Response(JSON.stringify(mockTree), { status: 200 });
    }
    return new Response(JSON.stringify({}), { status: 200 });
  };
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

describe('P4 - GalleryPage', () => {
  it('renders page title', async () => {
    render(<GalleryPage />);
    expect(screen.getByText('作品库')).toBeTruthy();
  });

  it('shows folder tree after loading', async () => {
    render(<GalleryPage />);
    await waitFor(() => {
      expect(screen.getByTestId('folder-tree')).toBeTruthy();
    });
  });

  it('shows creation names in tree', async () => {
    render(<GalleryPage />);
    await waitFor(() => {
      expect(screen.getByText(/戴森球/)).toBeTruthy();
      expect(screen.getByText(/环形世界/)).toBeTruthy();
    });
  });

  it('shows placeholder when no batch selected', () => {
    render(<GalleryPage />);
    expect(screen.getByText('选择左侧目录查看作品')).toBeTruthy();
  });

  it('loads batch on date click', async () => {
    render(<GalleryPage />);
    await waitFor(() => {
      expect(screen.getByText(/戴森球/)).toBeTruthy();
    });
    const creationEl = screen.getByText(/戴森球/);
    fireEvent.click(creationEl);
    await waitFor(() => {
      const dateEls = screen.getAllByText('2026-01-15');
      expect(dateEls.length).toBeGreaterThan(0);
    });
    const dateEls = screen.getAllByText('2026-01-15');
    fireEvent.click(dateEls[0]);
    await waitFor(() => {
      expect(screen.getByTestId('image-grid')).toBeTruthy();
    });
  });
});
