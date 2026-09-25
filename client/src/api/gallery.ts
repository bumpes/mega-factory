const BASE = '/api';

export interface GalleryTree {
  creationName: string;
  dates: string[];
}

export interface GalleryBatch {
  creationName: string;
  date: string;
  dirPath: string;
  images: GalleryImage[];
  hasPrompt: boolean;
  hasCopywriting: boolean;
}

export interface GalleryImage {
  filename: string;
  filePath: string;
  compared: boolean;
  totalScore?: number;
}

export async function fetchGalleryTree(): Promise<GalleryTree[]> {
  const res = await fetch(`${BASE}/gallery`);
  return res.json();
}

export async function fetchGalleryBatch(creationName: string, date: string): Promise<GalleryBatch> {
  const res = await fetch(`${BASE}/gallery/${encodeURIComponent(creationName)}/${date}`);
  if (!res.ok) throw new Error('Batch not found');
  return res.json();
}

export async function fetchGalleryText(creationName: string, date: string, filename: string): Promise<string> {
  const res = await fetch(`${BASE}/gallery/${encodeURIComponent(creationName)}/${date}/${filename}`);
  if (!res.ok) throw new Error('File not found');
  const data = await res.json();
  return data.content;
}

export async function downloadZip(paths: string[]): Promise<void> {
  const res = await fetch(`${BASE}/gallery/zip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paths }),
  });
  if (!res.ok) throw new Error('Zip failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gallery.zip';
  a.click();
  URL.revokeObjectURL(url);
}
