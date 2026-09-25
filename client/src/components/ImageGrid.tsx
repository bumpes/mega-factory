import { useState } from 'react';
import type { GalleryImage } from '../api/gallery';

interface Props {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function ImageGrid({ images, onImageClick }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [multiMode, setMultiMode] = useState(false);

  const toggleSelect = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div data-testid="image-grid">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">{images.length} 张图片</span>
        <button
          onClick={() => { setMultiMode(!multiMode); setSelected(new Set()); }}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
        >
          {multiMode ? '取消多选' : '多选'}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <div
            key={img.filename}
            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${
              selected.has(idx) ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => multiMode ? toggleSelect(idx) : onImageClick(idx)}
          >
            <div className="aspect-square bg-gray-900">
              <img
                src={`/api/gallery/image?path=${encodeURIComponent(img.filePath)}`}
                alt={img.filename}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
              {img.compared ? (
                <span className="text-xs text-green-400">已比较 ({img.totalScore})</span>
              ) : (
                <span className="text-xs text-gray-400">未比较</span>
              )}
            </div>
            {multiMode && selected.has(idx) && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">&#10003;</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {multiMode && selected.size > 0 && (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm text-gray-400">已选 {selected.size} 张</span>
          <button
            onClick={() => {
              const paths = Array.from(selected).map((i) => images[i].filePath);
              import('../api/gallery').then(({ downloadZip }) => downloadZip(paths));
            }}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          >
            下载 ZIP
          </button>
        </div>
      )}
    </div>
  );
}
