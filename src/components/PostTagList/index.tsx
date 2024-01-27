import { Chip, Link } from "@nextui-org/react";

type Props = Pick<PostDynamic, "tags">;

const PostTagList = (props: Props) => {
  return props.tags.map((e) => (
    <Chip key={e} as={Link} href={`/?tags=${e}`} className="mr-1">
      {e}
    </Chip>
  ));
};
export default PostTagList;