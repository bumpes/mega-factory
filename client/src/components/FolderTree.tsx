import { useState } from 'react';
import type { GalleryTree } from '../api/gallery';

interface Props {
  tree: GalleryTree[];
  selectedCreation: string | null;
  selectedDate: string | null;
  onSelect: (creationName: string, date: string) => void;
}

export default function FolderTree({ tree, selectedCreation, selectedDate, onSelect }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  if (tree.length === 0) {
    return <p className="text-gray-400 text-sm">暂无作品</p>;
  }

  return (
    <div className="space-y-1" data-testid="folder-tree">
      {tree.map((item) => (
        <div key={item.creationName}>
          <div
            onClick={() => toggleExpand(item.creationName)}
            className={`font-medium text-sm px-2 py-1 rounded cursor-pointer ${
              selectedCreation === item.creationName ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {expanded.has(item.creationName) ? '▾ ' : '▸ '}{item.creationName}
          </div>
          {expanded.has(item.creationName) && (
            <div className="ml-4 space-y-0.5">
              {item.dates.map((date) => (
                <div
                  key={date}
                  onClick={() => onSelect(item.creationName, date)}
                  className={`text-xs px-2 py-1 rounded cursor-pointer ${
                    selectedDate === date ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
