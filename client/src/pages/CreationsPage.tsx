import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCreations, fetchCategories, aiGenerate, deleteCreation, type Creation } from '../api/creations';
import CreationCard from '../components/CreationCard';
import CreationDrawer from '../components/CreationDrawer';

export default function CreationsPage() {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState<Creation | null>(null);
  const [genCount, setGenCount] = useState(5);
  const [genError, setGenError] = useState('');

  const { data: creations = [], isLoading } = useQuery({
    queryKey: ['creations', keyword, category],
    queryFn: () => fetchCreations({ keyword: keyword || undefined, category: category || undefined }),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['creation-categories'],
    queryFn: fetchCategories,
  });

  const aiMutation = useMutation({
    mutationFn: () => aiGenerate(genCount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creations'] });
      setGenError('');
    },
    onError: (err: Error) => {
      setGenError(err.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCreation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['creations'] }),
  });

  void deleteMutation;

  const handleCardClick = useCallback((c: Creation) => setSelected(c), []);
  const handleSaved = useCallback((c: Creation) => {
    setSelected(c);
    queryClient.invalidateQueries({ queryKey: ['creations'] });
  }, [queryClient]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">创意库</h2>
        <div className="flex items-center gap-2">
          <select value={genCount} onChange={(e) => setGenCount(Number(e.target.value))}
            className="bg-gray-800 text-white rounded px-3 py-2 text-sm">
            {[5, 10, 15, 20].map((n) => <option key={n} value={n}>生成 {n} 条</option>)}
          </select>
          <button
            onClick={() => aiMutation.mutate()}
            disabled={aiMutation.isPending}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm"
            data-testid="ai-generate-btn"
          >
            {aiMutation.isPending ? '生成中...' : 'AI 生成'}
          </button>
        </div>
      </div>

      {genError && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded mb-4" data-testid="gen-error">
          {genError}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text" placeholder="搜索创意..." value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 bg-gray-800 text-white rounded px-3 py-2"
          data-testid="search-input"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800 text-white rounded px-3 py-2" data-testid="category-filter">
          <option value="">全部分类</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {isLoading ? (
        <p className="text-gray-400">加载中...</p>
      ) : creations.length === 0 ? (
        <p className="text-gray-400">暂无创意</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creations.map((c) => (
            <CreationCard key={c.id} creation={c} onClick={handleCardClick} />
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        共 {creations.length} 条创意
      </div>

      {selected && (
        <CreationDrawer
          creation={selected}
          onClose={() => setSelected(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
