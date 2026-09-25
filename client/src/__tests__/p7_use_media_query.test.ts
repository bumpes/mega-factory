import { describe, it, expect, beforeAll } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../hooks/useMediaQuery';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe('P7 - useMediaQuery', () => {
  it('returns false for non-matching query', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 99999px)'));
    expect(result.current).toBe(false);
  });

  it('returns boolean value', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 0px)'));
    expect(typeof result.current).toBe('boolean');
  });
});
