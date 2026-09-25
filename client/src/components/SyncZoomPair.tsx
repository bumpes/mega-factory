import { useState, useCallback } from 'react';

interface Props {
  imageA: string;
  imageB: string;
  labelA?: string;
  labelB?: string;
}

export default function SyncZoomPair({ imageA, imageB, labelA = 'A (生成)', labelB = 'B (参考)' }: Props) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.5, Math.min(4, z - e.deltaY * 0.001)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [dragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  const imgStyle = {
    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
  };

  return (
    <div className="grid grid-cols-2 gap-2" data-testid="sync-zoom-pair">
      {[{ src: imageA, label: labelA }, { src: imageB, label: labelB }].map(({ src, label }, i) => (
        <div key={i} className="relative">
          <div className="text-xs text-gray-400 mb-1">{label}</div>
          <div
            className="aspect-square bg-gray-900 rounded overflow-hidden cursor-grab"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img src={src} alt={label} style={imgStyle} className="w-full h-full object-contain transition-transform" />
          </div>
        </div>
      ))}
      <div className="col-span-2 flex items-center gap-3 mt-2">
        <span className="text-xs text-gray-400">缩放: {zoom.toFixed(1)}x</span>
        <input
          type="range" min={0.5} max={4} step={0.1} value={zoom}
          onChange={(e) => { setZoom(Number(e.target.value)); setPan({ x: 0, y: 0 }); }}
          className="flex-1"
          data-testid="zoom-slider"
        />
        <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded">
          重置
        </button>
      </div>
    </div>
  );
}
