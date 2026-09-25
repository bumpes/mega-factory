import type { Reference } from '../api/references';

interface Props {
  references: Reference[];
  onSelect: (ref: Reference) => void;
  selectedId?: string | null;
}

export default function RefGrid({ references, onSelect, selectedId }: Props) {
  if (references.length === 0) {
    return <p className="text-gray-400 text-sm">暂无参考图，请上传</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="ref-grid">
      {references.map((ref) => (
        <div
          key={ref.id}
          onClick={() => onSelect(ref)}
          className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${
            selectedId === ref.id ? 'border-blue-500' : 'border-transparent'
          }`}
        >
          <div className="aspect-square bg-gray-900">
            <img
              src={`/api/references/image?path=${encodeURIComponent(ref.file_path)}`}
              alt={ref.file_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
            <span className="text-xs text-gray-300 truncate block">{ref.file_name}</span>
          </div>
          {ref.feat_scale > 0 && (
            <div className="absolute top-1 right-1 bg-green-600/80 text-white text-xs px-1 rounded">
              已评
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
