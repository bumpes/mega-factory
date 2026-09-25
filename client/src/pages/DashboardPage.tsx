import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusCards from '../components/StatusCards';
import RunningTaskCard from '../components/RunningTaskCard';
import RecentStrips from '../components/RecentStrips';
import { useTaskSocket } from '../hooks/useTaskSocket';
import { fetchDashboard } from '../api/dashboard';
import type { DashboardData } from '../api/dashboard';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [progress, setProgress] = useState<Record<string, { done: number; total: number }>>({});
  const navigate = useNavigate();

  const handleWsEvent = useCallback((e: { event: string; data: unknown }) => {
    const d = e.data as Record<string, unknown>;
    if (e.event === 'task:started' && d?.task_id) {
      setProgress((prev) => ({ ...prev, [d.task_id as string]: { done: 0, total: Number(d.total) || 0 } }));
    }
    if (e.event === 'image:done' && d?.task_id) {
      setProgress((prev) => {
        const cur = prev[d.task_id as string] || { done: 0, total: 0 };
        return { ...prev, [d.task_id as string]: { ...cur, done: cur.done + 1 } };
      });
    }
    if (e.event === 'task:completed' && d?.task_id) {
      setProgress((prev) => {
        const next = { ...prev };
        delete next[d.task_id as string];
        return next;
      });
    }
  }, []);

  useTaskSocket(handleWsEvent);

  const load = useCallback(async () => {
    const d = await fetchDashboard();
    setData(d);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (!data) {
    return <div className="p-4"><p className="text-gray-400">加载中...</p></div>;
  }

  return (
    <div className="h-full overflow-y-auto p-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">工作台</h2>
        <button
          onClick={() => navigate('/task')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded"
          data-testid="new-task-btn"
        >
          发起新任务
        </button>
      </div>

      <StatusCards
        comfyStatus={data.comfyStatus}
        comfyError={data.comfyError}
        creationCount={data.creationCount}
        pendingComparisonCount={data.pendingComparisonCount}
        runningTaskCount={data.runningTasks.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">运行中任务</h3>
          <RunningTaskCard tasks={data.runningTasks} progress={progress} />
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <RecentStrips recentImages={data.recentImages} recentComparisons={data.recentComparisons} />
        </div>
      </div>
    </div>
  );
}
