import PostList from "@/components/PostList";
import { useApiSWR } from "@/hooks/use-api";
import { CircularProgress, Divider } from "@nextui-org/react";

const LatestPostsPage = () => {
  const post = useApiSWR<Post[]>(`/post/newest`, {
    requireAuth: false,
  });

  if (post.isLoading) return <CircularProgress />;
  if (post.error) return <>Unexpected error {post.error}</>;

  const { data } = post;

  return (
    <div className="max-auto">
      <h2 className="text-2xl text-center">Latest posts</h2>
      <Divider className="my-3" />

      <PostList posts={data ?? []} />
    </div>
  );
};
export default LatestPostsPage;
