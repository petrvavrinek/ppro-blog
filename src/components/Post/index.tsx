import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import AuthGuard from "../AuthGuard";
import PostAuthorCard from "../PostAuthorCard";
import PostFavouriteButton from "../PostFavouriteButton";
import PostTagList from "../PostTagList";

const Post = (props: { post: PostDynamic; className?: string }) => {
  const { post } = props;
  const content = post.content.substring(0, 300);

  return (
    <Card className={`max-w-[600px] mx-auto ${props.className}`}>
      <CardHeader className="flex gap-3 flex-col items-start">
        <Link href={`/post/${post.slug}`}>
          <h2 className="text-2xl font-semibold">{post.title}</h2>
        </Link>
        <div className="w-full">
          <PostTagList tags={post.tags} />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>{content}</CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-between">
        <PostAuthorCard user={post.author} />
        <div className="self-end text-xs flex items-center">
          <AuthGuard>
            <PostFavouriteButton post={post} className="p-1 mr-2" size="sm" />
          </AuthGuard>
          <div>
            Liked by {post.favouriteBy} user(s) |{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
