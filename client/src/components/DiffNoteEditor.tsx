import { useState } from 'react';

interface Props {
  note: string;
  diffWarnings: string[];
  onChange: (note: string) => void;
}

export default function DiffNoteEditor({ note, diffWarnings, onChange }: Props) {
  const [, setTemplate] = useState('');

  const insertTemplate = () => {
    if (diffWarnings.length > 0) {
      const tpl = `差异维度: ${diffWarnings.join(', ')}\n需要改进的方面:\n`;
      setTemplate(tpl);
      onChange(note + (note ? '\n' : '') + tpl);
    }
  };

  return (
    <div data-testid="diff-note-editor">
      {diffWarnings.length > 0 && (
        <div className="mb-2">
          <span className="text-xs text-yellow-400">⚠ 差异较大: {diffWarnings.join(', ')}</span>
          <button onClick={insertTemplate}
            className="ml-2 text-xs text-blue-400 hover:text-blue-300"
            data-testid="insert-template-btn">
            插入笔记模板
          </button>
        </div>
      )}
      <textarea
        value={note}
        onChange={(e) => onChange(e.target.value)}
        placeholder="比较备注..."
        className="w-full bg-gray-800 text-gray-200 text-sm rounded p-2"
        rows={3}
        data-testid="note-textarea"
      />
    </div>
  );
}
