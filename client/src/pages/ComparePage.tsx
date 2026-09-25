import { useState, useEffect, useCallback } from 'react';
import SyncZoomPair from '../components/SyncZoomPair';
import ScoreSliders from '../components/ScoreSliders';
import DiffNoteEditor from '../components/DiffNoteEditor';
import CompareHistory from '../components/CompareHistory';
import { fetchHistory, createComparison } from '../api/compare';
import type { ScoreCard, Comparison } from '../api/compare';

const emptyCard = (): ScoreCard => ({
  feat_scale: 0, feat_composition: 0, feat_light: 0,
  feat_detail: 0, feat_material: 0, feat_mood: 0, feat_color: 0,
});

export default function ComparePage() {
  const [imageA, setImageA] = useState('');
  const [imageB, setImageB] = useState('');
  const [scoreA, setScoreA] = useState<ScoreCard>(emptyCard());
  const [scoreB, setScoreB] = useState<ScoreCard>(emptyCard());
  const [note, setNote] = useState('');
  const [creationId, setCreationId] = useState('');
  const [refId, setRefId] = useState('');
  const [history, setHistory] = useState<Comparison[]>([]);
  const [saving, setSaving] = useState(false);

  const loadHistory = useCallback(async () => {
    const data = await fetchHistory();
    setHistory(data);
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const diff = Object.keys(scoreA).reduce((acc, key) => {
    acc[key] = Math.abs(scoreA[key as keyof ScoreCard] - scoreB[key as keyof ScoreCard]);
    return acc;
  }, {} as Record<string, number>);

  const warnings = Object.entries(diff).filter(([, v]) => v >= 2).map(([k]) => k);

  const handleSave = async () => {
    if (!imageA || !imageB || !creationId || !refId) return;
    setSaving(true);
    try {
      await createComparison({ creationId, genImagePath: imageA, refId, scoreA, scoreB, note });
      setNote('');
      await loadHistory();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">比较工作台</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">生成图路径</label>
                <input value={imageA} onChange={(e) => setImageA(e.target.value)}
                  className="w-full bg-gray-900 text-gray-200 text-sm rounded p-1.5 mt-1"
                  data-testid="image-a-input" placeholder="生成图路径" />
              </div>
              <div>
                <label className="text-xs text-gray-400">参考图路径</label>
                <input value={imageB} onChange={(e) => setImageB(e.target.value)}
                  className="w-full bg-gray-900 text-gray-200 text-sm rounded p-1.5 mt-1"
                  data-testid="image-b-input" placeholder="参考图路径" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">创意ID</label>
                <input value={creationId} onChange={(e) => setCreationId(e.target.value)}
                  className="w-full bg-gray-900 text-gray-200 text-sm rounded p-1.5 mt-1"
                  data-testid="creation-id-input" />
              </div>
              <div>
                <label className="text-xs text-gray-400">参考图ID</label>
                <input value={refId} onChange={(e) => setRefId(e.target.value)}
                  className="w-full bg-gray-900 text-gray-200 text-sm rounded p-1.5 mt-1"
                  data-testid="ref-id-input" />
              </div>
            </div>
          </div>

          {imageA && imageB && (
            <div className="bg-gray-800 rounded-lg p-4">
              <SyncZoomPair imageA={imageA} imageB={imageB} />
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-4">
            <ScoreSliders scoreA={scoreA} scoreB={scoreB} onChangeA={setScoreA} onChangeB={setScoreB} />
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <DiffNoteEditor note={note} diffWarnings={warnings} onChange={setNote} />
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !imageA || !imageB || !creationId || !refId}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-6 py-2 rounded"
            data-testid="save-compare-btn"
          >
            {saving ? '保存中...' : '保存比较'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <CompareHistory history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}
