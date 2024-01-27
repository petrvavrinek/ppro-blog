import { Link, User } from "@nextui-org/react";

const PostAuthorCard = (props: { user: User }) => {
  const { user } = props;

  return (
    <Link href={`/user/${user.id}`}>
      <User name={user.username} avatarProps={{ src: user.photo }} />
    </Link>
  );
};

export default PostAuthorCard;
