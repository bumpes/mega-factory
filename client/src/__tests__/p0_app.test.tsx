import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

let originalFetch: typeof globalThis.fetch;

beforeAll(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input: RequestInfo | URL) => {
    return new Response(JSON.stringify({}), { status: 200 });
  };
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

describe('P0 - Client scaffold', () => {
  it('renders app with title in layout', () => {
    render(<App />);
    const titles = screen.getAllByText('巨构工厂');
    expect(titles.length).toBeGreaterThanOrEqual(1);
  });
});
