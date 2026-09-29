import type { ToolSet } from 'ai';
import { searchKbTool } from './schemas/search_kb.tool.schema.js';

export const toolRegistry: ToolSet = {
  search_kb: searchKbTool,
};
