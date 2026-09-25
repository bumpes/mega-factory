import { getSetting } from '../config/settings';
import fs from 'fs';
import path from 'path';

export async function testComfyConnection(): Promise<{ ok: boolean; error?: string }> {
  const url = getSetting('comfyui_url');
  try {
    const res = await fetch(`${url}/system_stats`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      return { ok: true };
    }
    return { ok: false, error: `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export interface QueuePromptResult {
  prompt_id: string;
  number: number;
}

export async function queuePrompt(workflow: Record<string, unknown>): Promise<QueuePromptResult> {
  const url = getSetting('comfyui_url');
  const res = await fetch(`${url}/prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: workflow }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ComfyUI queue failed: HTTP ${res.status} - ${text.slice(0, 300)}`);
  }
  return res.json() as Promise<QueuePromptResult>;
}

export interface HistoryEntry {
  prompt_id: string;
  status: { status_str: string; completed: boolean; messages: unknown[] };
  outputs: Record<string, { images?: Array<{ filename: string; subfolder: string; type: string }> }>;
}

export async function getHistory(promptId: string): Promise<HistoryEntry | null> {
  const url = getSetting('comfyui_url');
  const res = await fetch(`${url}/history/${promptId}`);
  if (!res.ok) return null;
  const data = await res.json() as Record<string, HistoryEntry>;
  return data[promptId] || null;
}

export async function downloadImage(filename: string, subfolder: string, type: string, destPath: string): Promise<void> {
  const url = getSetting('comfyui_url');
  const params = new URLSearchParams({ filename, subfolder, type });
  const res = await fetch(`${url}/view?${params}`);
  if (!res.ok) throw new Error(`Failed to download image: HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(destPath, buffer);
}

export function buildWorkflow(template: Record<string, unknown>, prompt: string, width: number, height: number, seed?: number): Record<string, unknown> {
  const wf = JSON.parse(JSON.stringify(template));
  const s = seed ?? Math.floor(Math.random() * 2147483647);

  for (const node of Object.values(wf) as Record<string, unknown>[]) {
    const inputs = node.inputs as Record<string, unknown> | undefined;
    if (!inputs) continue;
    if (inputs.text === 'POSITIVE_PROMPT_PLACEHOLDER') inputs.text = prompt;
    if (inputs.width === 'WIDTH_PLACEHOLDER') inputs.width = width;
    if (inputs.height === 'HEIGHT_PLACEHOLDER') inputs.height = height;
    if (inputs.seed === 'SEED_PLACEHOLDER') inputs.seed = s;
  }

  return wf;
}

export function loadWorkflowTemplate(): Record<string, unknown> {
  const templatePath = path.resolve(import.meta.dirname, '../../workflows/qwen_image_edit.json');
  const content = fs.readFileSync(templatePath, 'utf-8');
  return JSON.parse(content);
}
