import type { LLMProvider } from './provider';
import { YuanbaoProvider } from './yuanbao';
import { QwenProvider } from './qwen';
import { getSetting } from '../../config/settings';

export type { LLMProvider, GeneratedCreation } from './provider';

export function createLLMProvider(): LLMProvider {
  const provider = getSetting('llm_provider');
  const apiKey = getSetting('llm_api_key');
  const model = getSetting('llm_model');

  switch (provider) {
    case 'yuanbao':
      return new YuanbaoProvider(apiKey, model);
    case 'qwen':
      return new QwenProvider(apiKey, model);
    default:
      return new QwenProvider(apiKey, model);
  }
}
