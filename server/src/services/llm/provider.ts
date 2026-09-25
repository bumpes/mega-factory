export interface GeneratedCreation {
  name: string;
  category: string;
  setting_desc: string;
  copywriting_md: string;
  prompt: string;
  style_tag: string;
}

export interface LLMProvider {
  readonly name: string;
  generateCreations(count: number, styleTemplate: string): Promise<GeneratedCreation[]>;
  testConnection(): Promise<{ ok: boolean; error?: string }>;
}
