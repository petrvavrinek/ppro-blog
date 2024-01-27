import AuthGuard from "@/components/AuthGuard";

import PostAuthorCard from "@/components/PostAuthorCard";
import PostCommentList from "@/components/PostCommentList";
import PostCreateComment from "@/components/PostCreateComment";
import PostTagList from "@/components/PostTagList";
import { useApiSWR } from "@/hooks/use-api";
import { Chip, CircularProgress, Divider, Link } from "@nextui-org/react";
import { useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const params = useParams();
  const postParamId = params["id"];
  const post = useApiSWR<PostDynamic>(`/post/${postParamId}`, {
    requireAuth: false,
  });
  const [userComments, setUserComments] = useState<PostComment[]>([]);

  if (post.isLoading) return <CircularProgress />;
  if (post.error) return <>Unexpected error {post.error}</>;

  const { data } = post;

  if (!data) return <>Invalid post</>;

  const onCommentAdded = (comment: PostComment) =>
    setUserComments([comment, ...userComments]);

  return (
    <div className="max-auto">
      <h1 className="text-2xl justify-center text-center">{data?.title}</h1>
      <PostTagList tags={data.tags} />
      <Divider className="my-3" />
      <div className="w-full min-h-[220px] prose lg:prose-xl dark:prose-invert">
        <Markdown>{data?.content}</Markdown>
      </div>

      <Divider className="my-3" />

      <div className="w-full flex items-center justify-between">
        <PostAuthorCard user={data?.author!} />

        <div>{new Date(data.createdAt).toLocaleString()}</div>
      </div>

      <div className="mt-3">
        <AuthGuard>
          <h2 className="text-xl font-semibold">Write comment</h2>
          <PostCreateComment post={data} onCommentAdded={onCommentAdded} />
        </AuthGuard>
        <h2 className="text-xl font-semibold mt-4">Comments</h2>
        <PostCommentList post={data} prependComments={userComments} />
      </div>
    </div>
  );
};
export default PostDetailPage;
