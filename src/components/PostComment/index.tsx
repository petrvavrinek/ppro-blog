import { useApiFetch } from "@/hooks/use-api";
import { useUser } from "@/hooks/use-user";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import DateBefore from "../DateBefore";
import PostAuthorCard from "../PostAuthorCard";

type Props = {
  postComment: PostComment;
  onDelete?: () => void;
};

const PostComment = (props: Props) => {
  const user = useUser();
  const [isFetchingDelete, setIsFetchingDelete] = useState(false);
  const useApi = useApiFetch();

  const { postComment: comment } = props;

  const onDelete = () => {
    setIsFetchingDelete(true);
    useApi(`/post/comment/${comment.id}`, { method: "DELETE" })
      .then(() => props.onDelete && props?.onDelete())
      .finally(() => setIsFetchingDelete(false));
  };

  return (
    <Card className="w-full mb-2">
      <CardBody>{comment.content}</CardBody>
      <CardFooter className="flex justify-between">
        <PostAuthorCard user={comment.author} />
        <div>
          <DateBefore date={new Date(comment.createdAt)} />
          {user?.id == comment.author.id ? (
            <Button
              color="danger"
              onPress={onDelete}
              isLoading={isFetchingDelete}
              className="ml-2"
            >
              Delete
            </Button>
          ) : undefined}
        </div>
      </CardFooter>
    </Card>
  );
};
export default PostComment;
