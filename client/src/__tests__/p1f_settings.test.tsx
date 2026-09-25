import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SettingsPage from '../pages/SettingsPage';

const mockSettings = {
  comfyui_url: 'http://localhost:8188',
  llm_provider: 'yuanbao',
  llm_api_key: 'test-key',
  llm_model: 'deepseek',
  llm_deep_think: true,
  output_dir: './output',
  reference_dir: './references',
  default_count: 3,
  default_resolution: '1024x1024',
  style_template: '巨构风格',
};

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

function renderSettings() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/settings']}>
        <SettingsPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('P1f - Settings page', () => {
  it('renders all section headings', async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(mockSettings), { status: 200 });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('设置')).toBeDefined();
    });

    expect(screen.getByText('ComfyUI')).toBeDefined();
    expect(screen.getByText('云端 LLM')).toBeDefined();
    expect(screen.getByText('路径')).toBeDefined();
    expect(screen.getByText('生成默认值')).toBeDefined();
    expect(screen.getByText('局域网访问')).toBeDefined();
  });

  it('renders ComfyUI test connection button', async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(mockSettings), { status: 200 });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('测试连接')).toBeDefined();
    });
  });

  it('renders LLM test button', async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(mockSettings), { status: 200 });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('测试')).toBeDefined();
    });
  });

  it('renders save button', async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(mockSettings), { status: 200 });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('保存设置')).toBeDefined();
    });
  });

  it('populates form fields with settings data', async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(mockSettings), { status: 200 });

    renderSettings();

    await waitFor(() => {
      const comfyInput = screen.getByDisplayValue('http://localhost:8188');
      expect(comfyInput).toBeDefined();
    });

    const outputInput = screen.getByDisplayValue('./output');
    expect(outputInput).toBeDefined();
    const refInput = screen.getByDisplayValue('./references');
    expect(refInput).toBeDefined();
  });

  it('renders LLM provider options', async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(mockSettings), { status: 200 });

    renderSettings();

    await waitFor(() => {
      expect(screen.getByText('元宝深度思考')).toBeDefined();
      expect(screen.getByText('通义千问')).toBeDefined();
    });
  });
});
