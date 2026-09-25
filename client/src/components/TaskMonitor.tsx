import { useQuery } from '@tanstack/react-query';
import { fetchTaskImages, type Task, type TaskImage } from '../api/tasks';
import ImageCell from './ImageCell';
import { fetchCreation } from '../api/creations';

interface Props {
  task: Task;
}

export default function TaskMonitor({ task }: Props) {
  const { data: images = [] } = useQuery({
    queryKey: ['task-images', task.id],
    queryFn: () => fetchTaskImages(task.id),
    refetchInterval: task.status === 'running' ? 2000 : false,
  });

  const statusLabels: Record<string, string> = {
    running: '运行中',
    completed: '已完成',
    cancelled: '已取消',
    failed: '失败',
  };

  const done = images.filter((i) => i.status === 'done').length;
  const failed = images.filter((i) => i.status === 'failed').length;
  const total = images.length;
  const progress = total > 0 ? Math.round(((done + failed) / total) * 100) : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700" data-testid="task-monitor">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-white font-bold">任务 {task.id.slice(0, 8)}</span>
          <span className="text-gray-400 text-sm ml-2">
            {new Date(task.created_at).toLocaleString()}
          </span>
        </div>
        <span className={`text-sm px-2 py-1 rounded ${
          task.status === 'running' ? 'bg-blue-600' :
          task.status === 'completed' ? 'bg-green-600' :
          task.status === 'cancelled' ? 'bg-yellow-600' : 'bg-red-600'
        } text-white`}>
          {statusLabels[task.status]}
        </span>
      </div>

      {task.status === 'running' && (
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>进度: {done}/{total} 完成{failed > 0 ? `, ${failed} 失败` : ''}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <ImageCellWithCreation key={img.id} image={img} />
        ))}
      </div>
    </div>
  );
}

function ImageCellWithCreation({ image }: { image: TaskImage }) {
  const { data: creation } = useQuery({
    queryKey: ['creation', image.creation_id],
    queryFn: () => fetchCreation(image.creation_id),
    staleTime: 60000,
  });

  return <ImageCell image={image} creationName={creation?.name} />;
}
