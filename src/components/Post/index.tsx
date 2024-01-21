const Post = (props: { post: Post }) => {
  const { post } = props;

  return <div>{post.id}</div>;
};

export default Post;
