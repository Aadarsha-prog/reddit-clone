import type { ChatEventArgs, StreamMessageArgs } from '../providers/interface.js';

export function createStreamResponseEvent(args: StreamMessageArgs) {
  function emit(event: ChatEventArgs) {
    args.onEvent?.(event);
  }

  let hasStartedResponse = false;

  return {
    onStepStart: ({ stepNumber }: { stepNumber: number }) => {
      if (stepNumber > 0) {
        emit({ state: 'think', response: 'Creating a response' });
      }
    },
    onToolExecutionStart: ({ toolCall }: { toolCall: { toolName: string } }) => {
      if (toolCall.toolName === 'search_kb') {
        emit({ state: 'tool', response: 'Searching the knowledge base' });
      }
    },
    onToolExecutionEnd: ({ toolCall }: { toolCall: { toolName: string } }) => {
      if (toolCall.toolName === 'search_kb') return;

      emit({
        state: 'tool',
        response: 'Found the information from the knowledge base',
      });
    },

    onChunk: ({ chunk }: { chunk: { type: string; text?: string } }) => {
      if (chunk.type !== 'text-delta' || typeof chunk.text !== 'string') return;

      if (!hasStartedResponse) {
        hasStartedResponse = true;
        emit({
          state: 'response',
          response: 'Sending response...',
        });
      }

      emit({
        state: 'message',
        response: chunk.text,
      });
    },
  };
}
