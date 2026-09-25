import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Settings {
  comfyui_url: string;
  llm_provider: string;
  llm_api_key: string;
  llm_model: string;
  llm_deep_think: boolean;
  output_dir: string;
  reference_dir: string;
  default_count: number;
  default_resolution: string;
  style_template: string;
}

async function fetchSettings(): Promise<Settings> {
  const res = await fetch('/api/settings');
  return res.json();
}

async function saveSettings(settings: Partial<Settings>): Promise<void> {
  await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
}

async function testComfy(): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('/api/settings/test-comfy');
  return res.json();
}

async function testLLM(): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('/api/settings/test-llm');
  return res.json();
}

async function fetchLanAddresses(): Promise<string[]> {
  const res = await fetch('/api/network/lan-addresses');
  const data = await res.json();
  return data.addresses || [];
}

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Settings | null>(null);
  const [comfyStatus, setComfyStatus] = useState<'idle' | 'testing' | 'ok' | 'error'>('idle');
  const [llmStatus, setLlmStatus] = useState<'idle' | 'testing' | 'ok' | 'error'>('idle');
  const [comfyError, setComfyError] = useState('');
  const [llmError, setLlmError] = useState('');
  const [lanAddresses, setLanAddresses] = useState<string[]>([]);
  const [qrSvg, setQrSvg] = useState<string>('');

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  useEffect(() => {
    fetchLanAddresses().then(setLanAddresses).catch(() => {});
  }, []);

  useEffect(() => {
    if (lanAddresses.length > 0) {
      const url = `http://${lanAddresses[0]}:3000`;
      fetch(`/api/network/qrcode?url=${encodeURIComponent(url)}`)
        .then((res) => res.text())
        .then(setQrSvg)
        .catch(() => {});
    }
  }, [lanAddresses]);

  const mutation = useMutation({
    mutationFn: saveSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  const handleChange = (key: keyof Settings, value: string | number | boolean) => {
    if (!form) return;
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    if (!form) return;
    mutation.mutate(form);
  };

  const handleTestComfy = async () => {
    setComfyStatus('testing');
    setComfyError('');
    const result = await testComfy();
    if (result.ok) {
      setComfyStatus('ok');
    } else {
      setComfyStatus('error');
      setComfyError(result.error || '连接失败');
    }
  };

  const handleTestLLM = async () => {
    setLlmStatus('testing');
    setLlmError('');
    const result = await testLLM();
    if (result.ok) {
      setLlmStatus('ok');
    } else {
      setLlmStatus('error');
      setLlmError(result.error || '连接失败');
    }
  };

  if (!form) return <div className="text-gray-400">加载中...</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold">设置</h2>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">ComfyUI</h3>
        <div>
          <label className="block text-sm text-gray-400 mb-1">地址</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.comfyui_url}
              onChange={(e) => handleChange('comfyui_url', e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
            />
            <button
              onClick={handleTestComfy}
              disabled={comfyStatus === 'testing'}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {comfyStatus === 'testing' ? '测试中...' : '测试连接'}
            </button>
          </div>
          {comfyStatus === 'ok' && <p className="text-green-400 text-sm mt-1">● 连接成功</p>}
          {comfyStatus === 'error' && <p className="text-red-400 text-sm mt-1">● {comfyError}</p>}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">云端 LLM</h3>
        <div>
          <label className="block text-sm text-gray-400 mb-1">提供商</label>
          <select
            value={form.llm_provider}
            onChange={(e) => handleChange('llm_provider', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="yuanbao">元宝深度思考</option>
            <option value="qwen">通义千问</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">API Key</label>
          <div className="flex gap-2">
            <input
              type="password"
              value={form.llm_api_key}
              onChange={(e) => handleChange('llm_api_key', e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
              placeholder="输入 API Key"
            />
            <button
              onClick={handleTestLLM}
              disabled={llmStatus === 'testing'}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {llmStatus === 'testing' ? '测试中...' : '测试'}
            </button>
          </div>
          {llmStatus === 'ok' && <p className="text-green-400 text-sm mt-1">● 连接成功</p>}
          {llmStatus === 'error' && <p className="text-red-400 text-sm mt-1">● {llmError}</p>}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">路径</h3>
        <div>
          <label className="block text-sm text-gray-400 mb-1">输出目录</label>
          <input
            type="text"
            value={form.output_dir}
            onChange={(e) => handleChange('output_dir', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">参考图库目录</label>
          <input
            type="text"
            value={form.reference_dir}
            onChange={(e) => handleChange('reference_dir', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">生成默认值</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">默认张数</label>
            <input
              type="number"
              value={form.default_count}
              onChange={(e) => handleChange('default_count', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">默认分辨率</label>
            <input
              type="text"
              value={form.default_resolution}
              onChange={(e) => handleChange('default_resolution', e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">提示词风格模板</label>
          <textarea
            value={form.style_template}
            onChange={(e) => handleChange('style_template', e.target.value)}
            rows={3}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">局域网访问</h3>
        <div className="bg-gray-800 rounded p-4">
          <p className="text-sm text-gray-400 mb-2">本机地址（手机扫码访问）</p>
          {lanAddresses.length === 0 ? (
            <p className="text-gray-500 text-sm">未检测到局域网地址</p>
          ) : (
            <div className="space-y-1">
              {lanAddresses.map((addr) => (
                <p key={addr} className="text-lg font-mono text-blue-400">
                  http://{addr}:3000
                </p>
              ))}
            </div>
          )}
          {qrSvg && (
            <div
              className="mt-4 inline-block bg-white p-2 rounded"
              data-testid="qrcode-svg"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          )}
        </div>
      </section>

      <button
        onClick={handleSave}
        disabled={mutation.isPending}
        className="w-full py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {mutation.isPending ? '保存中...' : '保存设置'}
      </button>
      {mutation.isSuccess && <p className="text-green-400 text-center">✓ 已保存</p>}
    </div>
  );
}
