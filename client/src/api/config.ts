const STORAGE_KEY = 'mega_factory_api_url';

export function getApiBase(): string {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function setApiBase(url: string): void {
  const trimmed = url.replace(/\/+$/, '');
  if (trimmed) {
    localStorage.setItem(STORAGE_KEY, trimmed);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function api(path: string): string {
  return `${getApiBase()}/api${path}`;
}

export function getWsUrl(): string {
  const base = getApiBase();
  if (!base) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}/ws`;
  }
  const u = new URL(base);
  return `${u.protocol === 'https:' ? 'wss:' : 'ws:'}//${u.host}/ws`;
}
