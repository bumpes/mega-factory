import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ComparePage from '../pages/ComparePage';

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('/api/compare/history')) {
      return new Response(JSON.stringify([]), { status: 200 });
    }
    return new Response(JSON.stringify({}), { status: 200 });
  };
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

describe('P5b - ComparePage', () => {
  it('renders page title', () => {
    render(<ComparePage />);
    expect(screen.getByText('比较工作台')).toBeTruthy();
  });

  it('shows save button', () => {
    render(<ComparePage />);
    expect(screen.getByTestId('save-compare-btn')).toBeTruthy();
  });

  it('shows image input fields', () => {
    render(<ComparePage />);
    expect(screen.getByTestId('image-a-input')).toBeTruthy();
    expect(screen.getByTestId('image-b-input')).toBeTruthy();
  });

  it('shows score sliders', () => {
    render(<ComparePage />);
    expect(screen.getByTestId('score-sliders')).toBeTruthy();
  });

  it('shows compare history section', async () => {
    render(<ComparePage />);
    await waitFor(() => {
      expect(screen.getByText('暂无比较记录')).toBeTruthy();
    });
  });
});
