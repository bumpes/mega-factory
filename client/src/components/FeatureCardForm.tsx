import { useState, useEffect } from 'react';
import type { FeatureCard } from '../api/references';

interface Props {
  initial?: FeatureCard;
  onSave: (card: FeatureCard) => void;
}

const DIMENSIONS: { key: keyof Omit<FeatureCard, 'highlight_note'>; label: string }[] = [
  { key: 'feat_scale', label: '尺度' },
  { key: 'feat_composition', label: '构图' },
  { key: 'feat_light', label: '光影' },
  { key: 'feat_detail', label: '细节' },
  { key: 'feat_material', label: '材质' },
  { key: 'feat_mood', label: '氛围' },
  { key: 'feat_color', label: '色彩' },
];

export default function FeatureCardForm({ initial, onSave }: Props) {
  const [card, setCard] = useState<FeatureCard>(
    initial || { feat_scale: 0, feat_composition: 0, feat_light: 0, feat_detail: 0, feat_material: 0, feat_mood: 0, feat_color: 0, highlight_note: '' }
  );

  useEffect(() => {
    if (initial) setCard(initial);
  }, [initial]);

  const update = (key: keyof Omit<FeatureCard, 'highlight_note'>, val: number) => {
    setCard((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-3" data-testid="feature-card-form">
      {DIMENSIONS.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-sm text-gray-300 w-12">{label}</span>
          <input
            type="range"
            min={0}
            max={5}
            value={card[key]}
            onChange={(e) => update(key, Number(e.target.value))}
            className="flex-1"
            data-testid={`slider-${key}`}
          />
          <span className="text-sm text-gray-400 w-6 text-right">{card[key]}</span>
        </div>
      ))}
      <div>
        <textarea
          value={card.highlight_note}
          onChange={(e) => setCard((prev) => ({ ...prev, highlight_note: e.target.value }))}
          placeholder="亮点备注..."
          className="w-full bg-gray-800 text-gray-200 text-sm rounded p-2"
          rows={2}
          data-testid="highlight-note"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSave(card)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded"
          data-testid="save-card-btn"
        >
          保存特征卡
        </button>
        <button
          onClick={() => alert('AI 提取功能将在 v2 提供')}
          className="bg-gray-700 text-gray-400 text-sm px-4 py-1.5 rounded cursor-not-allowed"
          data-testid="ai-extract-btn"
        >
          AI 提取 (v2)
        </button>
      </div>
    </div>
  );
}
