import { useState } from 'react';
import type { GalleryImage } from '../api/gallery';

interface Props {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  promptText?: string;
  copywritingText?: string;
}

export default function Lightbox({ images, currentIndex, onClose, onIndexChange, promptText, copywritingText }: Props) {
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const img = images[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setZoom(1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
      setZoom(1);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex" data-testid="lightbox">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <span className="text-white text-sm">{currentIndex + 1} / {images.length}</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setZoom((z) => Math.min(z + 0.5, 4))}
              className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">+</button>
            <button onClick={() => setZoom((z) => Math.max(z - 0.5, 0.5))}
              className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">-</button>
            <button onClick={() => setShowInfo(!showInfo)}
              className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
              {showInfo ? '隐藏信息' : '查看信息'}
            </button>
            <button onClick={onClose}
              className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">&times;</button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-auto relative">
          <button onClick={handlePrev} disabled={currentIndex === 0}
            className="absolute left-4 z-10 text-white bg-gray-800/50 hover:bg-gray-700 p-2 rounded disabled:opacity-30">
            &#8592;
          </button>

          <img
            src={`/api/gallery/image?path=${encodeURIComponent(img.filePath)}`}
            alt={img.filename}
            style={{ transform: `scale(${zoom})` }}
            className="max-w-full max-h-full transition-transform"
          />

          <button onClick={handleNext} disabled={currentIndex === images.length - 1}
            className="absolute right-4 z-10 text-white bg-gray-800/50 hover:bg-gray-700 p-2 rounded disabled:opacity-30">
            &#8594;
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="w-80 bg-gray-900 p-4 overflow-y-auto border-l border-gray-700">
          <h3 className="text-white font-bold mb-3">{img.filename}</h3>
          {promptText && (
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 mb-1">提示词</h4>
              <p className="text-sm text-gray-200 font-mono bg-gray-800 p-2 rounded">{promptText}</p>
              <button onClick={() => copyToClipboard(promptText)}
                className="text-xs text-blue-400 hover:text-blue-300 mt-1">复制</button>
            </div>
          )}
          {copywritingText && (
            <div>
              <h4 className="text-sm text-gray-400 mb-1">文案</h4>
              <div className="text-sm text-gray-200 bg-gray-800 p-2 rounded"
                dangerouslySetInnerHTML={{ __html: copywritingText }} />
              <button onClick={() => copyToClipboard(copywritingText)}
                className="text-xs text-blue-400 hover:text-blue-300 mt-1">复制</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
