import type { ChatMessageSchema } from '@reddit-clone/shared';
import { OpenAIProvider } from './openai/index.js';
import { CustomError } from '../../../http/error/customError.js';

export function getChatProvider(provider: ChatMessageSchema['provider']) {
  switch (provider) {
    case 'openai':
      return new OpenAIProvider();

    default:
      throw new CustomError(`Unsupported chat provider: ${provider}`, 400);
  }
}
