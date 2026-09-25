import type { Creation } from '../api/creations';

interface Props {
  creation: Creation;
  onClick: (c: Creation) => void;
}

export default function CreationCard({ creation, onClick }: Props) {
  const isNew = creation.source === 'ai' &&
    (Date.now() - new Date(creation.created_at).getTime()) < 1000 * 60 * 60 * 24;

  return (
    <div
      className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700"
      onClick={() => onClick(creation)}
      data-testid="creation-card"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-lg text-white leading-tight">{creation.name}</h3>
        {isNew && (
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded ml-2 shrink-0">NEW</span>
        )}
      </div>
      <div className="flex gap-2 mb-3">
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{creation.category}</span>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{creation.style_tag}</span>
        {creation.source === 'ai' && (
          <span className="text-xs bg-purple-700 text-purple-200 px-2 py-0.5 rounded">AI</span>
        )}
      </div>
      <p className="text-sm text-gray-400 line-clamp-3">{creation.setting_desc}</p>
    </div>
  );
}
