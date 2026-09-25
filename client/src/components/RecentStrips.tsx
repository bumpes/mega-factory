import { useNavigate } from 'react-router-dom';

interface Props {
  recentImages: Array<{ id: string; task_id: string; status: string; file_path: string }>;
  recentComparisons: Array<{ id: string; creation_id: string; note: string; created_at: string }>;
}

export default function RecentStrips({ recentImages, recentComparisons }: Props) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-300">最近生成</h3>
          <button onClick={() => navigate('/gallery')} className="text-xs text-blue-400 hover:text-blue-300">
            查看全部
          </button>
        </div>
        {recentImages.length === 0 ? (
          <p className="text-gray-500 text-xs">暂无</p>
        ) : (
          <div className="flex gap-2 overflow-x-auto" data-testid="recent-images">
            {recentImages.slice(0, 6).map((img) => (
              <div key={img.id} className="w-16 h-16 bg-gray-800 rounded shrink-0" />
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-300">最近比较</h3>
          <button onClick={() => navigate('/compare')} className="text-xs text-blue-400 hover:text-blue-300">
            查看全部
          </button>
        </div>
        {recentComparisons.length === 0 ? (
          <p className="text-gray-500 text-xs">暂无</p>
        ) : (
          <div className="space-y-1" data-testid="recent-comparisons">
            {recentComparisons.slice(0, 5).map((cmp) => (
              <div key={cmp.id} className="text-xs text-gray-400 bg-gray-800 rounded p-2">
                {cmp.note || `比较 ${cmp.creation_id}`}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
