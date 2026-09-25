interface Props {
  comfyStatus: 'online' | 'offline';
  comfyError?: string;
  creationCount: number;
  pendingComparisonCount: number;
  runningTaskCount: number;
}

export default function StatusCards({ comfyStatus, comfyError, creationCount, pendingComparisonCount, runningTaskCount }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" data-testid="status-cards">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-xs text-gray-400">ComfyUI</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`w-3 h-3 rounded-full ${comfyStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-lg font-bold">{comfyStatus === 'online' ? '在线' : '离线'}</span>
        </div>
        {comfyError && <p className="text-xs text-red-400 mt-1 truncate">{comfyError}</p>}
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-xs text-gray-400">创意数</div>
        <div className="text-2xl font-bold mt-1">{creationCount}</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-xs text-gray-400">待比较</div>
        <div className="text-2xl font-bold mt-1">{pendingComparisonCount}</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-xs text-gray-400">运行中任务</div>
        <div className="text-2xl font-bold mt-1">{runningTaskCount}</div>
      </div>
    </div>
  );
}
