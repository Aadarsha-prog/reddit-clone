import type { PostCreateInput } from "./schemas/create.schema.js";

export const posts: (PostCreateInput & {
  id: string;
})[] = [];
