import { getAllPosts } from '@/lib/api/post.api';
import PostList from './post/_components/list';

export default async function Home() {
  const post = await getAllPosts();

  if (post.data) return <PostList posts={post.data} />;

  return null;
}
