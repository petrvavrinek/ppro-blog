import CreatePost from "@/components/CreatePost";
import { useApiFetch } from "@/hooks/use-api";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const fetch = useApiFetch();

  const onSubmit = async (post: object) => {
    const data = await fetch<PostStatic>(`/post`, {
      method: "POST",
      body: post,
    });
    navigate(`/post/${data.slug}`);
  };

  return (
    <div className="max-auto">
      <h1 className="text-2xl justify-center text-center">Create new post</h1>
      <CreatePost onSubmit={(post) => onSubmit(post)} />
    </div>
  );
};

export default CreatePostPage;
