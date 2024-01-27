type User = {
  id: number;
  username: string;
  createdAt: string;
  photo: string;
};

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};

type PostComment = {
  createdAt: string,
  updatedAt: string,
  author: User,
  post: Post,
  content: string,
  id: number
}
