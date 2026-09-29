import { smoothStream, stepCountIs, streamText } from 'ai';
import type { ChatProvider, StreamMessageArgs } from '../interface.js';
import { buildSystemPrompt } from '../../prompts/system-prompt.js';
import { toolRegistry } from '../../tools/registry.js';
import { createStreamResponseEvent } from '../../responses/event-responses.js';
import type { OpenAIProviderSchema } from '@reddit-clone/shared';
import { env } from '../../../../lib/env.schema.js';
import { CustomError } from '../../../../http/error/customError.js';
import { createOpenAI } from '@ai-sdk/openai';

export class OpenAIProvider implements ChatProvider {
  getOpenAIModel(modelId: OpenAIProviderSchema['model']) {
    if (!env.OPENAI_API_KEY) {
      throw new CustomError('OPENAI_API_KEY is not set in the environment', 401);
    }

    const openAIFn = createOpenAI({
      apiKey: env.OPENAI_API_KEY,
    });

    return openAIFn(modelId);
  }

  streamMessage(args: StreamMessageArgs) {
    return streamText({
      model: this.getOpenAIModel(args.model),
      system: buildSystemPrompt(),
      reasoning: args.reasoning,
      prompt: args.message,
      tools: toolRegistry,
      temperature: 0.4,
      stopWhen: stepCountIs(3),
      ...createStreamResponseEvent(args),
      onError: ({ error }) => {
        console.error('An error occurred while streaming the message', error);
      },
      experimental_transform: smoothStream({
        chunking: 'word',
        delayInMs: 50,
      }),
    });
  }
}
