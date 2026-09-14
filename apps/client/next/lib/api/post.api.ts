import { ApiResponse, PostCreateInput } from '@reddit-clone/shared';
import { axiosV1 } from '../axios';

export async function createNewPost(data: PostCreateInput) {
  const res = await axiosV1.post<ApiResponse>('/post', data);
  return res.data;
}
