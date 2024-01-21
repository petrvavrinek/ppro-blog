import Post from "../Post";

const PostList = ({ posts }: { posts: Post[] }) => {
  if (!posts.length) return <>No posts to be shown</>;
  return posts.map((e) => <Post key={`post-${e.id}`} post={e} />);
};
export default PostList;
