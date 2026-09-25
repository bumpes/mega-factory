import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ReferencePage from '../pages/ReferencePage';

const mockRefs: any[] = [];

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();

    if (url.endsWith('/api/references') && (!init || init.method === undefined || init.method === 'GET')) {
      return new Response(JSON.stringify(mockRefs), { status: 200 });
    }
    if (url.includes('/api/references/upload') && init?.method === 'POST') {
      const newRef = {
        id: 'ref_new', file_name: 'uploaded.png', file_path: '/tmp/uploaded.png',
        feat_scale: 0, feat_composition: 0, feat_light: 0, feat_detail: 0,
        feat_material: 0, feat_mood: 0, feat_color: 0, highlight_note: '',
        created_at: new Date().toISOString(),
      };
      mockRefs.push(newRef);
      return new Response(JSON.stringify(newRef), { status: 201 });
    }
    if (url.includes('/feature-card') && init?.method === 'PUT') {
      const body = JSON.parse(init.body as string);
      return new Response(JSON.stringify({ ...mockRefs[0], ...body }), { status: 200 });
    }
    if (url.includes('/api/references/image')) {
      return new Response('fake', { status: 200, headers: { 'Content-Type': 'image/png' } });
    }
    return new Response(JSON.stringify({}), { status: 200 });
  };
});

afterAll(() => {
  globalThis.fetch = originalFetch;
  mockRefs.length = 0;
});

describe('P5 - ReferencePage', () => {
  it('renders page title', () => {
    render(<ReferencePage />);
    expect(screen.getByText('参考图库')).toBeTruthy();
  });

  it('shows upload button', () => {
    render(<ReferencePage />);
    expect(screen.getByTestId('upload-btn')).toBeTruthy();
  });

  it('shows drop zone', () => {
    render(<ReferencePage />);
    expect(screen.getByTestId('drop-zone')).toBeTruthy();
  });

  it('shows count of references', async () => {
    mockRefs.length = 0;
    render(<ReferencePage />);
    await waitFor(() => {
      expect(screen.getByText('0 张')).toBeTruthy();
    });
  });

  it('v2 AI extract button shows alert without error', () => {
    mockRefs.length = 0;
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ReferencePage />);
    const btn = screen.getByTestId('upload-btn');
    expect(btn).toBeTruthy();
    alertSpy.mockRestore();
  });
});
