import { useState, useEffect, useCallback, useRef } from 'react';
import RefGrid from '../components/RefGrid';
import FeatureCardForm from '../components/FeatureCardForm';
import { fetchReferences, uploadReference, deleteReference, saveFeatureCard } from '../api/references';
import type { Reference, FeatureCard } from '../api/references';

export default function ReferencePage() {
  const [refs, setRefs] = useState<Reference[]>([]);
  const [selected, setSelected] = useState<Reference | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const data = await fetchReferences();
    setRefs(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (file: File) => {
    await uploadReference(file);
    await load();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(handleUpload);
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    Array.from(files).forEach(handleUpload);
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteReference(selected.id);
    setSelected(null);
    await load();
  };

  const handleSaveCard = async (card: FeatureCard) => {
    if (!selected) return;
    const updated = await saveFeatureCard(selected.id, card);
    setSelected(updated);
    await load();
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">参考图库</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{refs.length} 张</span>
          <button
            onClick={() => fileRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded"
            data-testid="upload-btn"
          >
            上传
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput} data-testid="file-input" />
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 mb-4 transition-colors ${
          dragOver ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
        }`}
        data-testid="drop-zone"
      >
        <p className="text-center text-gray-400 text-sm">拖拽图片到此处上传</p>
      </div>

      <RefGrid references={refs} onSelect={setSelected} selectedId={selected?.id} />

      {selected && (
        <div className="mt-6 bg-gray-800 rounded-lg p-4" data-testid="detail-panel">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">{selected.file_name}</h3>
            <button onClick={handleDelete} className="text-red-400 hover:text-red-300 text-sm" data-testid="delete-ref-btn">
              删除
            </button>
          </div>
          <FeatureCardForm
            initial={{
              feat_scale: selected.feat_scale,
              feat_composition: selected.feat_composition,
              feat_light: selected.feat_light,
              feat_detail: selected.feat_detail,
              feat_material: selected.feat_material,
              feat_mood: selected.feat_mood,
              feat_color: selected.feat_color,
              highlight_note: selected.highlight_note,
            }}
            onSave={handleSaveCard}
          />
        </div>
      )}
    </div>
  );
}
