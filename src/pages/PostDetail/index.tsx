import { useApiCall } from "@/hooks/use-api";
import { Avatar, CircularProgress, Divider } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";

const PostDetailPage = () => {
  const params = useParams();
  const postParamId = params["id"];
  const post = useApiCall<Post>(`/post/${postParamId}`, {
    requireAuth: false,
  });

  if (post.isLoading) return <CircularProgress />;
  if (post.error) return <>Unexpected error {post.error}</>;

  const { data } = post;

  return (
    <div className="max-auto">
      <h1 className="text-2xl justify-center text-center">{data?.title}</h1>
      <Divider className="my-3" />
      <div className="w-full">
        <Markdown>{data?.content}</Markdown>
      </div>
      <Divider className="my-3" />

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <Avatar name={data?.author.username} className="mr-2" />
          {data?.author.username}
        </div>
        <div>{data?.createdAt}</div>
      </div>
    </div>
  );
};
export default PostDetailPage;
