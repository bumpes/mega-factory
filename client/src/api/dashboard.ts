const BASE = '/api';

export interface DashboardData {
  comfyStatus: 'online' | 'offline';
  comfyError?: string;
  creationCount: number;
  pendingComparisonCount: number;
  recentImages: Array<{ id: string; task_id: string; status: string; file_path: string; created_at: string }>;
  recentComparisons: Array<{ id: string; creation_id: string; note: string; created_at: string }>;
  runningTasks: Array<{ id: string; created_at: string; params_json: string; status: string }>;
}

export async function fetchDashboard(): Promise<DashboardData> {
  const res = await fetch(`${BASE}/dashboard`);
  return res.json();
}
