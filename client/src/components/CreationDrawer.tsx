import { useState } from 'react';
import type { Creation } from '../api/creations';
import { updateCreation } from '../api/creations';

interface Props {
  creation: Creation;
  onClose: () => void;
  onSaved: (c: Creation) => void;
}

export default function CreationDrawer({ creation, onClose, onSaved }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(creation.name);
  const [settingDesc, setSettingDesc] = useState(creation.setting_desc);
  const [copywritingMd, setCopywritingMd] = useState(creation.copywriting_md);
  const [prompt, setPrompt] = useState(creation.prompt);
  const [styleTag, setStyleTag] = useState(creation.style_tag);
  const [category, setCategory] = useState(creation.category);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateCreation(creation.id, {
        name, setting_desc: settingDesc, copywriting_md: copywritingMd,
        prompt, style_tag: styleTag, category,
      });
      onSaved(updated);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex" data-testid="creation-drawer">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-2xl bg-gray-900 h-full overflow-y-auto p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editing ? '编辑创意' : creation.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        {!editing ? (
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{creation.category}</span>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{creation.style_tag}</span>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">来源: {creation.source}</span>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">科幻设定</h3>
              <p className="text-gray-200 leading-relaxed">{creation.setting_desc}</p>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">生活化文案</h3>
              <div className="text-gray-200 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: creation.copywriting_md }} />
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">图片提示词</h3>
              <p className="text-gray-300 text-sm font-mono bg-gray-800 p-3 rounded">{creation.prompt}</p>
            </section>

            <button
              onClick={() => setEditing(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              编辑文案 / 提示词
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">名称</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">分类</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">风格标签</label>
              <input value={styleTag} onChange={(e) => setStyleTag(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">科幻设定</label>
              <textarea value={settingDesc} onChange={(e) => setSettingDesc(e.target.value)} rows={4}
                className="w-full bg-gray-800 text-white rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">生活化文案 (Markdown)</label>
              <textarea value={copywritingMd} onChange={(e) => setCopywritingMd(e.target.value)} rows={6}
                className="w-full bg-gray-800 text-white rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">图片提示词</label>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4}
                className="w-full bg-gray-800 text-white rounded px-3 py-2 font-mono text-sm" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded">
                {saving ? '保存中...' : '保存'}
              </button>
              <button onClick={() => setEditing(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded">
                取消
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
