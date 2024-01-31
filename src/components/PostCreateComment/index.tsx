import { useApiFetch } from "@/hooks/use-api";
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  post: PostStatic;
  onCommentAdded: (comment: PostComment) => void;
};

const PostCreateComment = (props: Props) => {
  const [content, setContent] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const useApi = useApiFetch();

  const onSubmit = async () => {
    if (content.trim().length <= 0) return;

    setIsFetching(true);
    const result = await useApi<PostComment>(`/post/${props.post.id}/comment`, {
      body: {
        content,
      },
      method: "POST",
    });
    setIsFetching(false);

    if (result) {
      toast("Post comment has been created");
      setContent("");
      props.onCommentAdded(result);
    } else {
      toast.warn("Could not add post comment");
    }
  };

  return (
    <div className="w-full">
      <Textarea
        className="w-full"
        placeholder="Write a comment..."
        value={content}
        onValueChange={(e) => setContent(e)}
      />
      <Button
        color="primary"
        className="mt-2"
        onPress={onSubmit}
        isLoading={isFetching}
        isDisabled={content.trim().length == 0}
      >
        Submit
      </Button>
    </div>
  );
};
export default PostCreateComment;
