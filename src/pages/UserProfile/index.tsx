import PostList from "@/components/PostList";
import { useApiSWR } from "@/hooks/use-api";
import { CircularProgress, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const params = useParams();
  const userParamId = params["id"];
  const user = useApiSWR<User>(`/user/${userParamId}`, {
    requireAuth: false,
  });
  const userPosts = useApiSWR<Post[]>(`/user/${userParamId}/post`, {
    requireAuth: false,
  });

  if (user.isLoading) return <CircularProgress />;
  if (user.error) return <>Unexpected error {user.error}</>;

  const { data } = user;

  return (
    <div className="mx-auto">
      <div className="mx-auto w-fit">
        <Image radius="full" className="max-w-28" src={data?.photo} />
      </div>
      <h2 className="text-2xl justify-center text-center">{data?.username}</h2>

      <div className="w-full mt-2">
        <div className="mx-auto">
          {userPosts.isLoading ? (
            <CircularProgress className="w-fit" />
          ) : (
            <PostList posts={userPosts.data ?? []} />
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfilePage;
