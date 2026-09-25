import { useState, useEffect, useCallback } from 'react';
import FolderTree from '../components/FolderTree';
import ImageGrid from '../components/ImageGrid';
import Lightbox from '../components/Lightbox';
import { fetchGalleryTree, fetchGalleryBatch, fetchGalleryText } from '../api/gallery';
import type { GalleryTree, GalleryBatch } from '../api/gallery';

export default function GalleryPage() {
  const [tree, setTree] = useState<GalleryTree[]>([]);
  const [selectedCreation, setSelectedCreation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [batch, setBatch] = useState<GalleryBatch | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [promptText, setPromptText] = useState<string | undefined>();
  const [copywritingText, setCopywritingText] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const loadTree = useCallback(async () => {
    const data = await fetchGalleryTree();
    setTree(data);
  }, []);

  useEffect(() => { loadTree(); }, [loadTree]);

  const handleSelect = useCallback(async (creationName: string, date: string) => {
    setSelectedCreation(creationName);
    setSelectedDate(date);
    setLightboxIndex(null);
    setLoading(true);
    try {
      const data = await fetchGalleryBatch(creationName, date);
      setBatch(data);
      if (data.hasPrompt) {
        try { setPromptText(await fetchGalleryText(creationName, date, '提示词.txt')); } catch { /* ignore */ }
      } else {
        setPromptText(undefined);
      }
      if (data.hasCopywriting) {
        try { setCopywritingText(await fetchGalleryText(creationName, date, '文案.md')); } catch { /* ignore */ }
      } else {
        setCopywritingText(undefined);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      <div className="md:w-56 shrink-0 overflow-y-auto">
        <h2 className="text-lg font-bold mb-3">作品库</h2>
        <FolderTree
          tree={tree}
          selectedCreation={selectedCreation}
          selectedDate={selectedDate}
          onSelect={handleSelect}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {!selectedCreation && (
          <p className="text-gray-400">选择左侧目录查看作品</p>
        )}
        {selectedCreation && loading && (
          <p className="text-gray-400">加载中...</p>
        )}
        {batch && !loading && (
          <div>
            <h3 className="text-md font-semibold mb-2">{batch.creationName} / {batch.date}</h3>
            <ImageGrid images={batch.images} onImageClick={handleImageClick} />
          </div>
        )}
      </div>
      {lightboxIndex !== null && batch && (
        <Lightbox
          images={batch.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
          promptText={promptText}
          copywritingText={copywritingText}
        />
      )}
    </div>
  );
}
