import type { TaskImage } from '../api/tasks';
import { retryImage } from '../api/tasks';

interface Props {
  image: TaskImage;
  creationName?: string;
}

export default function ImageCell({ image, creationName }: Props) {
  const statusColors: Record<string, string> = {
    queued: 'bg-gray-700',
    generating: 'bg-blue-600 animate-pulse',
    done: 'bg-green-600',
    failed: 'bg-red-600',
  };

  const statusLabels: Record<string, string> = {
    queued: '排队中',
    generating: '生成中...',
    done: '完成',
    failed: '失败',
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700" data-testid="image-cell">
      <div className="aspect-square bg-gray-900 flex items-center justify-center relative">
        {image.status === 'done' && image.file_path ? (
          <img
            src={`/api/file?path=${encodeURIComponent(image.file_path)}`}
            alt={creationName || 'generated'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-12 h-12 rounded-full ${statusColors[image.status] || 'bg-gray-700'} flex items-center justify-center`}>
            {image.status === 'generating' && (
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {image.status === 'failed' && <span className="text-white text-xl">!</span>}
            {image.status === 'queued' && <span className="text-gray-400 text-sm">...</span>}
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-0.5 rounded text-white ${statusColors[image.status]}`}>
            {statusLabels[image.status]}
          </span>
          {image.elapsed_ms > 0 && (
            <span className="text-xs text-gray-400">{(image.elapsed_ms / 1000).toFixed(1)}s</span>
          )}
        </div>
        {creationName && <p className="text-xs text-gray-400 mt-1 truncate">{creationName}</p>}
        {image.status === 'failed' && (
          <button
            onClick={() => retryImage(image.id)}
            className="mt-1 text-xs text-blue-400 hover:text-blue-300"
          >
            重试单张
          </button>
        )}
        {image.error && <p className="text-xs text-red-400 mt-1 truncate" title={image.error}>{image.error}</p>}
      </div>
    </div>
  );
}
