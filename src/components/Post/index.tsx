import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import PostAuthorCard from "../PostAuthorCard";

const Post = (props: { post: Post; className?: string }) => {
  const { post } = props;
  const content = post.content.substring(0, 300);

  return (
    <Card className={`max-w-[600px] mx-auto ${props.className}`}>
      <CardHeader className="flex gap-3">
        <Link href={`/post/${post.slug}`}>
          <h2 className="text-2xl font-semibold">{post.title}</h2>
        </Link>
      </CardHeader>
      <Divider />
      <CardBody>{content}</CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-between">
        <PostAuthorCard user={post.author} />
        <div className="self-end text-xs">
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
