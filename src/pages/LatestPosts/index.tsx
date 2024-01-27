import PostList from "@/components/PostList";
import { useApiSWR } from "@/hooks/use-api";
import { CircularProgress, Divider } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";

const LatestPostsPage = () => {
  const [searchParams] = useSearchParams();
  const tags = searchParams.get("tags");
  const fetchUrl = `/post/newest` + (tags ? "?tags=" + tags : "");

  const post = useApiSWR<PostDynamic[]>(fetchUrl, {
    requireAuth: false,
  });

  if (post.isLoading) return <CircularProgress />;
  if (post.error) return <>Unexpected error {post.error}</>;

  const { data } = post;

  return (
    <div className="max-auto">
      <h2 className="text-2xl text-center">
        Latest posts{" "}
        {tags && (
          <>
            with tag: <strong>{tags}</strong>
          </>
        )}
      </h2>
      <Divider className="my-3" />

      <PostList posts={data ?? []} />
    </div>
  );
};
export default LatestPostsPage;
