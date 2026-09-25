import type { ScoreCard } from '../api/compare';

interface Props {
  scoreA: ScoreCard;
  scoreB: ScoreCard;
  onChangeA: (card: ScoreCard) => void;
  onChangeB: (card: ScoreCard) => void;
}

const DIMENSIONS: { key: keyof ScoreCard; label: string }[] = [
  { key: 'feat_scale', label: '尺度' },
  { key: 'feat_composition', label: '构图' },
  { key: 'feat_light', label: '光影' },
  { key: 'feat_detail', label: '细节' },
  { key: 'feat_material', label: '材质' },
  { key: 'feat_mood', label: '氛围' },
  { key: 'feat_color', label: '色彩' },
];

export default function ScoreSliders({ scoreA, scoreB, onChangeA, onChangeB }: Props) {
  const updateA = (key: keyof ScoreCard, val: number) => {
    onChangeA({ ...scoreA, [key]: val });
  };
  const updateB = (key: keyof ScoreCard, val: number) => {
    onChangeB({ ...scoreB, [key]: val });
  };

  return (
    <div data-testid="score-sliders">
      <div className="grid grid-cols-[80px_1fr_40px_1fr_40px_50px] gap-2 items-center text-xs">
        <div className="text-gray-400 font-bold">维度</div>
        <div className="text-gray-400 font-bold">A侧</div>
        <div></div>
        <div className="text-gray-400 font-bold">B侧</div>
        <div></div>
        <div className="text-gray-400 font-bold text-center">差值</div>

        {DIMENSIONS.map(({ key, label }) => {
          const diff = Math.abs(scoreA[key] - scoreB[key]);
          const warn = diff >= 2;
          return (
            <div key={key} className="contents">
              <span className="text-gray-300">{label}</span>
              <input type="range" min={0} max={5} value={scoreA[key]}
                onChange={(e) => updateA(key, Number(e.target.value))}
                className="w-full" data-testid={`a-${key}`} />
              <span className="text-gray-400 text-center">{scoreA[key]}</span>
              <input type="range" min={0} max={5} value={scoreB[key]}
                onChange={(e) => updateB(key, Number(e.target.value))}
                className="w-full" data-testid={`b-${key}`} />
              <span className="text-gray-400 text-center">{scoreB[key]}</span>
              <span className={`text-center font-bold ${warn ? 'text-yellow-400' : 'text-gray-500'}`}
                data-testid={`diff-${key}`}>
                {diff}{warn ? ' ⚠' : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
