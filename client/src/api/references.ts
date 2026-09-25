const BASE = '/api';

export interface Reference {
  id: string;
  file_name: string;
  file_path: string;
  feat_scale: number;
  feat_composition: number;
  feat_light: number;
  feat_detail: number;
  feat_material: number;
  feat_mood: number;
  feat_color: number;
  highlight_note: string;
  created_at: string;
}

export interface FeatureCard {
  feat_scale: number;
  feat_composition: number;
  feat_light: number;
  feat_detail: number;
  feat_material: number;
  feat_mood: number;
  feat_color: number;
  highlight_note: string;
}

export async function fetchReferences(): Promise<Reference[]> {
  const res = await fetch(`${BASE}/references`);
  return res.json();
}

export async function fetchReference(id: string): Promise<Reference> {
  const res = await fetch(`${BASE}/references/${id}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function uploadReference(file: File): Promise<Reference> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${BASE}/references/upload`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export async function deleteReference(id: string): Promise<void> {
  await fetch(`${BASE}/references/${id}`, { method: 'DELETE' });
}

export async function saveFeatureCard(id: string, card: FeatureCard): Promise<Reference> {
  const res = await fetch(`${BASE}/references/${id}/feature-card`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error('Save failed');
  return res.json();
}
