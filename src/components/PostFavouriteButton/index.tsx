import { usePostUtils } from "@/hooks/use-post-utils";
import { Button, ButtonProps } from "@nextui-org/react";
import { useState } from "react";

type Props = {
  post: PostDynamic;
  size?: ButtonProps["size"];
  className?: string;
};

const PostFavouriteButton = (props: Props) => {
  const [isFavourite, setIsFavourite] = useState(props.post.favouriteByUser);
  const postUtils = usePostUtils(props.post);

  const onClick = () => {
    const newFavourite = !isFavourite;
    newFavourite ? postUtils?.like() : postUtils?.unlike();
    setIsFavourite(newFavourite);
  };

  return (
    <Button className={props.className} size={props.size} onPress={onClick}>
      {isFavourite ? "Unlike" : "Like"}
    </Button>
  );
};

export default PostFavouriteButton;
