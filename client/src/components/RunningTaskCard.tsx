interface Props {
  tasks: Array<{ id: string; created_at: string; params_json: string; status: string }>;
  progress?: Record<string, { done: number; total: number }>;
}

export default function RunningTaskCard({ tasks, progress }: Props) {
  if (tasks.length === 0) {
    return <p className="text-gray-400 text-sm">无运行中任务</p>;
  }

  return (
    <div className="space-y-2" data-testid="running-tasks">
      {tasks.map((task) => {
        const p = progress?.[task.id];
        const pct = p ? Math.round((p.done / p.total) * 100) : 0;
        return (
          <div key={task.id} className="bg-gray-800 rounded p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-200">任务 {task.id.slice(0, 8)}</span>
              <span className="text-xs text-gray-400">{p ? `${p.done}/${p.total}` : task.status}</span>
            </div>
            {p && (
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
