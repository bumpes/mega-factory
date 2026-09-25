import type { LLMProvider, GeneratedCreation } from './provider';

export class QwenProvider implements LLMProvider {
  readonly name = 'qwen';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'qwen-max') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async testConnection(): Promise<{ ok: boolean; error?: string }> {
    if (!this.apiKey) {
      return { ok: false, error: 'API Key 未配置' };
    }
    try {
      const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          input: { messages: [{ role: 'user', content: 'ping' }] },
          parameters: { max_tokens: 10 },
        }),
      });
      if (res.ok) {
        return { ok: true };
      }
      const text = await res.text();
      return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 200)}` };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  }

  async generateCreations(count: number, styleTemplate: string): Promise<GeneratedCreation[]> {
    const prompt = `你是一个科幻巨构建筑创意专家。请生成 ${count} 个独特的科幻巨构创意。

每个创意必须包含以下字段，以 JSON 数组格式输出：
- name: 创意名称（简洁有力）
- category: 分类标签
- setting_desc: 科幻设定描述（100-200字）
- copywriting_md: 细节化生活化配套文案（markdown格式，150-300字）
- style_tag: 风格标签
- prompt: 图片生成提示词（英文，必须包含 "${styleTemplate}"）

要求：每个巨构都要有压倒性的史诗尺度感，创意多样化，提示词具体画面感强，文案有生活气息。

直接输出 JSON 数组，不要有其他文字：`;

    const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: { messages: [{ role: 'user', content: prompt }] },
        parameters: { max_tokens: 4000, temperature: 0.8 },
      }),
    });

    if (!res.ok) {
      throw new Error(`LLM API error: HTTP ${res.status}`);
    }

    const data = await res.json() as { output: { text: string } };
    const content = data.output.text;

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse LLM response: no JSON array found');
    }

    const creations = JSON.parse(jsonMatch[0]) as GeneratedCreation[];
    return creations.slice(0, count);
  }
}
