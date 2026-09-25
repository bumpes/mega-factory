import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SettingsPage from '../pages/SettingsPage';

let originalFetch: typeof globalThis.fetch;

const mockSettings = {
  comfyui_url: 'http://127.0.0.1:8188',
  llm_provider: 'yuanbao',
  llm_api_key: '',
  llm_model: '',
  llm_deep_think: false,
  output_dir: './storage/output',
  reference_dir: './storage/references',
  default_count: 3,
  default_resolution: '1024x1024',
  style_template: '',
};

function renderSettings() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/api/settings') && !url.includes('test-')) {
      return new Response(JSON.stringify(mockSettings), { status: 200 });
    }
    if (url.includes('/api/network/lan-addresses')) {
      return new Response(JSON.stringify({ addresses: ['192.168.1.100'] }), { status: 200 });
    }
    if (url.includes('/api/network/qrcode')) {
      return new Response('<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' },
      });
    }
    if (url.includes('/api/settings/test-comfy')) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    if (url.includes('/api/settings/test-llm')) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response(JSON.stringify({}), { status: 200 });
  };
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

describe('P7 - SettingsPage LAN & QR', () => {
  it('shows LAN address section', async () => {
    renderSettings();
    await waitFor(() => {
      expect(screen.getByText('局域网访问')).toBeTruthy();
    });
  });

  it('displays LAN IP address', async () => {
    renderSettings();
    await waitFor(() => {
      expect(screen.getByText('http://192.168.1.100:3000')).toBeTruthy();
    });
  });

  it('renders QR code SVG', async () => {
    renderSettings();
    await waitFor(() => {
      expect(screen.getByTestId('qrcode-svg')).toBeTruthy();
    });
  });
});
