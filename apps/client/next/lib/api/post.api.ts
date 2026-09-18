import { ApiResponse, GetAllPostResponse, Post, PostCreateInput } from '@reddit-clone/shared';
import { axiosV1 } from '../axios';

export async function createNewPost(data: PostCreateInput) {
  const res = await axiosV1.post<ApiResponse>('/post', data);
  return res.data;
}

export async function getAllPosts() {
  const res = await axiosV1.get<GetAllPostResponse>('/post');
  return res.data;
}

export async function getPostBySlug(slug: string) {
  const res = await axiosV1.get<ApiResponse<Post>>(`/post/slug/${slug}`);
  return res.data;
}
