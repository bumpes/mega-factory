import { getDb } from '../db/sqlite';
import { testComfyConnection } from './comfyui';

export interface DashboardData {
  comfyStatus: 'online' | 'offline';
  comfyError?: string;
  creationCount: number;
  pendingComparisonCount: number;
  recentImages: Array<{ id: string; task_id: string; status: string; file_path: string; created_at: string }>;
  recentComparisons: Array<{ id: string; creation_id: string; note: string; created_at: string }>;
  runningTasks: Array<{ id: string; created_at: string; params_json: string; status: string }>;
}

export async function getDashboard(): Promise<DashboardData> {
  const db = getDb();

  let comfyStatus: 'online' | 'offline' = 'offline';
  let comfyError: string | undefined;
  const comfyResult = await testComfyConnection();
  if (comfyResult.ok) {
    comfyStatus = 'online';
  } else {
    comfyError = comfyResult.error;
  }

  let creationCount = 0;
  const cStmt = db.prepare('SELECT COUNT(*) as cnt FROM creations');
  if (cStmt.step()) {
    creationCount = (cStmt.getAsObject() as { cnt: number }).cnt;
  }
  cStmt.free();

  let totalImages = 0;
  const tiStmt = db.prepare('SELECT COUNT(*) as cnt FROM task_images');
  if (tiStmt.step()) {
    totalImages = (tiStmt.getAsObject() as { cnt: number }).cnt;
  }
  tiStmt.free();

  let comparedImages = 0;
  const ciStmt = db.prepare('SELECT COUNT(*) as cnt FROM comparisons');
  if (ciStmt.step()) {
    comparedImages = (ciStmt.getAsObject() as { cnt: number }).cnt;
  }
  ciStmt.free();

  const pendingComparisonCount = Math.max(0, totalImages - comparedImages);

  const recentImages: DashboardData['recentImages'] = [];
  const riStmt = db.prepare('SELECT id, task_id, status, file_path, "" as created_at FROM task_images WHERE status = "done" ORDER BY rowid DESC LIMIT 10');
  while (riStmt.step()) {
    recentImages.push(riStmt.getAsObject() as unknown as DashboardData['recentImages'][0]);
  }
  riStmt.free();

  const recentComparisons: DashboardData['recentComparisons'] = [];
  const rcStmt = db.prepare('SELECT id, creation_id, note, created_at FROM comparisons ORDER BY created_at DESC LIMIT 10');
  while (rcStmt.step()) {
    recentComparisons.push(rcStmt.getAsObject() as unknown as DashboardData['recentComparisons'][0]);
  }
  rcStmt.free();

  const runningTasks: DashboardData['runningTasks'] = [];
  const rtStmt = db.prepare('SELECT id, created_at, params_json, status FROM tasks WHERE status = "running" ORDER BY created_at DESC LIMIT 5');
  while (rtStmt.step()) {
    runningTasks.push(rtStmt.getAsObject() as unknown as DashboardData['runningTasks'][0]);
  }
  rtStmt.free();

  return { comfyStatus, comfyError, creationCount, pendingComparisonCount, recentImages, recentComparisons, runningTasks };
}
