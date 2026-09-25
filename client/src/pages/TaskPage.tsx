import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, createTask, cancelTask, type TaskParams } from '../api/tasks';
import { fetchCreations, type Creation } from '../api/creations';
import TaskMonitor from '../components/TaskMonitor';
import { useTaskSocket } from '../hooks/useTaskSocket';

export default function TaskPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [imagesPerCreation, setImagesPerCreation] = useState(1);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [promptOverride, setPromptOverride] = useState('');

  useTaskSocket(() => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    queryClient.invalidateQueries({ queryKey: ['task-images'] });
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    refetchInterval: 5000,
  });

  const { data: creations = [] } = useQuery({
    queryKey: ['creations'],
    queryFn: () => fetchCreations(),
  });

  const createMutation = useMutation({
    mutationFn: (params: TaskParams) => createTask(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setSelected(new Set());
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => cancelTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const toggleCreation = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleStart = () => {
    if (selected.size === 0) return;
    createMutation.mutate({
      creationIds: Array.from(selected),
      imagesPerCreation,
      width,
      height,
      promptOverride: promptOverride || undefined,
    });
  };

  const runningTask = tasks.find((t) => t.status === 'running');
  const totalImages = selected.size * imagesPerCreation;
  const estimatedSeconds = totalImages * 30;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">生成任务</h2>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
        <h3 className="text-lg font-bold text-white mb-3">发起新任务</h3>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">选择创意（已选 {selected.size} 个）</label>
          <div className="max-h-48 overflow-y-auto border border-gray-700 rounded p-2">
            {creations.slice(0, 50).map((c: Creation) => (
              <label key={c.id} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-700 px-2 rounded">
                <input
                  type="checkbox"
                  checked={selected.has(c.id)}
                  onChange={() => toggleCreation(c.id)}
                  className="rounded"
                />
                <span className="text-white text-sm">{c.name}</span>
                <span className="text-gray-500 text-xs">{c.category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">每张创意生成</label>
            <select value={imagesPerCreation} onChange={(e) => setImagesPerCreation(Number(e.target.value))}
              className="w-full bg-gray-700 text-white rounded px-3 py-2">
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} 张</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">宽度</label>
            <select value={width} onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full bg-gray-700 text-white rounded px-3 py-2">
              {[512, 768, 1024, 1280, 1536].map((n) => <option key={n} value={n}>{n}px</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">高度</label>
            <select value={height} onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-gray-700 text-white rounded px-3 py-2">
              {[512, 768, 1024, 1280, 1536].map((n) => <option key={n} value={n}>{n}px</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">预计耗时</label>
            <div className="text-white text-sm py-2">
              ~{Math.round(estimatedSeconds / 60)} 分钟 ({totalImages} 张)
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">提示词微调（留空使用创意默认）</label>
          <input value={promptOverride} onChange={(e) => setPromptOverride(e.target.value)}
            placeholder="可选：覆盖默认提示词"
            className="w-full bg-gray-700 text-white rounded px-3 py-2" />
        </div>

        <button
          onClick={handleStart}
          disabled={selected.size === 0 || createMutation.isPending || !!runningTask}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded"
          data-testid="start-task-btn"
        >
          {createMutation.isPending ? '提交中...' : runningTask ? '有任务运行中' : '开始生成'}
        </button>
        {createMutation.isError && (
          <p className="text-red-400 text-sm mt-2">{(createMutation.error as Error).message}</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">任务历史</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-400">暂无任务</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id}>
              <TaskMonitor task={task} />
              {task.status === 'running' && (
                <button
                  onClick={() => cancelMutation.mutate(task.id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                >
                  取消任务
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
