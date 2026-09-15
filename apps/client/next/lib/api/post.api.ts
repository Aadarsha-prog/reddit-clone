import { ApiResponse, GetAllPostResponse, Post, PostCreateInput } from '@reddit-clone/shared';
import axios from 'axios';
import { axiosV1 } from '../axios';

export async function createNewPost(data: PostCreateInput) {
  const res = await axiosV1.post<ApiResponse>('/post', data);
  return res.data;
}

export async function getAllPosts() {
  const res = await axiosV1.get<GetAllPostResponse>('/post');
  return res.data;
}

export async function getPostById(id: string) {
  try {
    const res = await axiosV1.get<ApiResponse<Post>>(`/post/${id}`);
    return res.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 404 || error.response?.status === 422)
    )
      return null;

    throw error;
  }
}
