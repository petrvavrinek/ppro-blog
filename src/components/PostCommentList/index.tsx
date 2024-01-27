import { useApiSWR } from "@/hooks/use-api";
import { CircularProgress } from "@nextui-org/react";
import PostComment from "../PostComment";
import { useMemo, useState } from "react";

type Props = {
  post: Post;
  prependComments?: PostComment[];
};

const PostCommentList = (props: Props) => {
  const { post } = props;
  const [deletedCommentIds, setDeletedCommentsIds] = useState<number[]>([]);

  const { data, isLoading, isValidating } = useApiSWR<PostComment[]>(
    `/post/${post.id}/comment`,
    {
      requireAuth: false,
    }
  );

  const comments = useMemo(() => {
    return [...(props.prependComments ?? []), ...(data ?? [])].filter(
      (e) => !deletedCommentIds.includes(e.id)
    );
  }, [data, deletedCommentIds, props.prependComments]);

  if (isLoading || isValidating) return <CircularProgress />;
  if (!data) return <>Could not fetch comments</>;

  return comments.map((e) => (
    <PostComment
      key={`comment-${e.id}`}
      postComment={e}
      onDelete={() => {
        setDeletedCommentsIds([...deletedCommentIds, e.id]);
      }}
    />
  ));
};

export default PostCommentList;
