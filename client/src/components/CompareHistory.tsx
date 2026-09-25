import type { Comparison } from '../api/compare';

interface Props {
  history: Comparison[];
  onSelect?: (cmp: Comparison) => void;
}

export default function CompareHistory({ history, onSelect }: Props) {
  if (history.length === 0) {
    return <p className="text-gray-400 text-sm">暂无比较记录</p>;
  }

  return (
    <div data-testid="compare-history">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">比较历史</h3>
      <div className="space-y-2">
        {history.map((cmp) => {
          const scoreA = JSON.parse(cmp.score_a_json) as Record<string, number>;
          const totalA = Object.values(scoreA).reduce((a, b) => a + b, 0);
          return (
            <div
              key={cmp.id}
              onClick={() => onSelect?.(cmp)}
              className="bg-gray-800 rounded p-2 cursor-pointer hover:bg-gray-750 text-sm"
            >
              <div className="flex justify-between">
                <span className="text-gray-300">A总分: {totalA}</span>
                <span className="text-gray-500 text-xs">{new Date(cmp.created_at).toLocaleString()}</span>
              </div>
              {cmp.note && <p className="text-gray-400 text-xs mt-1 truncate">{cmp.note}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
