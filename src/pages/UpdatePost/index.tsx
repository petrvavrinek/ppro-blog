import CreatePost from "@/components/CreatePost";
import { useApiFetch, useApiSWR } from "@/hooks/use-api";
import { useUser } from "@/hooks/use-user";
import { Button, CircularProgress, Link } from "@nextui-org/react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePostPage = () => {
  const user = useUser();
  const { id } = useParams();
  const { data, isLoading, isValidating } = useApiSWR<PostDynamic>(
    `/post/${id}`,
    {
      requireAuth: true,
    }
  );
  const useApi = useApiFetch();
  const navigate = useNavigate();

  if (isLoading || isValidating) return <CircularProgress />;
  if (!data) return <>Could not process post</>;
  

  if(data.author.id != user?.id)
    return <Navigate to={`/post/${data.slug}`} />;

  return (
    <div className="max-auto">
      <h1 className="text-2xl justify-center text-center">
        Update post {data.title}
      </h1>
      <CreatePost
        initialPost={{
          content: data.content,
          tags: data.tags,
          title: data.title,
        }}
        onSubmit={(post) => {
          useApi(`/post/${data.id}`, { method: "PATCH", body: post })
            .then(() => navigate(`/post/${data.slug}`))
            .catch(() => {
              toast.error(`Error while saving post`);
            });
        }}
      />
      <Button as={Link} className="mt-2" href={`/post/${data.slug}`}>Go to post</Button>
    </div>
  );
};
export default UpdatePostPage;
