import { api } from './config';

export interface Creation {
  id: string;
  name: string;
  category: string;
  source: string;
  setting_desc: string;
  copywriting_md: string;
  prompt: string;
  style_tag: string;
  created_at: string;
}

export async function fetchCreations(opts?: { keyword?: string; category?: string }): Promise<Creation[]> {
  const params = new URLSearchParams();
  if (opts?.keyword) params.set('keyword', opts.keyword);
  if (opts?.category) params.set('category', opts.category);
  const qs = params.toString();
  const res = await fetch(`${api('/creations')}${qs ? '?' + qs : ''}`);
  return res.json();
}

export async function fetchCreation(id: string): Promise<Creation> {
  const res = await fetch(api(`/creations/${id}`));
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(api('/creations/categories'));
  return res.json();
}

export async function createCreation(data: Partial<Creation>): Promise<Creation> {
  const res = await fetch(api('/creations'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCreation(id: string, data: Partial<Creation>): Promise<Creation> {
  const res = await fetch(api(`/creations/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCreation(id: string): Promise<void> {
  await fetch(api(`/creations/${id}`), { method: 'DELETE' });
}

export async function aiGenerate(count: number, styleTemplate?: string): Promise<{ creations: Creation[]; count: number }> {
  const res = await fetch(api('/creations/ai-generate'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count, styleTemplate }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'AI generation failed');
  }
  return res.json();
}
