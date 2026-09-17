import PostView from '@/app/post/_components/view';
import { getPostById } from '@/lib/api/post.api';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await getPostById(id);

  if (!response?.data) notFound();

  return <PostView post={response.data} />;
}
