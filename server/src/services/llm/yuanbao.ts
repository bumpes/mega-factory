import type { LLMProvider, GeneratedCreation } from './provider';

export class YuanbaoProvider implements LLMProvider {
  readonly name = 'yuanbao';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'yuanbao-deep-think') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async testConnection(): Promise<{ ok: boolean; error?: string }> {
    if (!this.apiKey) {
      return { ok: false, error: 'API Key 未配置' };
    }
    try {
      const res = await fetch('https://api.yuanbaoapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 10,
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
- category: 分类标签（如：能源巨构、轨道巨构、恒星工程、行星工程、壳世界等）
- setting_desc: 科幻设定描述（100-200字，描述这个巨构是什么、在哪里、做什么用）
- copywriting_md: 细节化生活化配套文案（markdown格式，150-300字，从居住者/使用者的视角描述日常生活的细节和感受）
- style_tag: 风格标签（如：赛博朋克、太空歌剧、硬科幻等）
- prompt: 图片生成提示词（英文，必须包含 "${styleTemplate}" 这些关键词，描述视觉画面）

要求：
1. 每个巨构都要有压倒性的史诗尺度感
2. 创意要多样化，涵盖不同类型的巨构
3. 提示词要具体、画面感强
4. 文案要有生活气息，不要干巴巴的技术描述

直接输出 JSON 数组，不要有其他文字：`;

    const res = await fetch('https://api.yuanbaoapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000,
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      throw new Error(`LLM API error: HTTP ${res.status}`);
    }

    const data = await res.json() as { choices: Array<{ message: { content: string } }> };
    const content = data.choices[0].message.content;

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse LLM response: no JSON array found');
    }

    const creations = JSON.parse(jsonMatch[0]) as GeneratedCreation[];
    return creations.slice(0, count);
  }
}
