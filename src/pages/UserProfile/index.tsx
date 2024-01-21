import PostList from "@/components/PostList";
import { useApiCall } from "@/hooks/use-api";
import { CircularProgress, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const params = useParams();
  const userParamId = params["id"];
  const user = useApiCall<User>(`/user/${userParamId}`, {
    requireAuth: false,
  });
  const userPosts = useApiCall<Post[]>(`/user/${userParamId}/post`, {
    requireAuth: false,
  });

  if (user.isLoading) return <CircularProgress />;
  if (user.error) return <>Unexpected error {user.error}</>;

  const { data } = user;

  return (
    <div className="mx-auto">
      <Image radius={"full"} src={data?.photo} fallbackSrc="" />
      <h2 className="text-2xl justify-center text-center">{data?.username}</h2>

      <div className="w-full mt-2">
        <div className="w-fit mx-auto">
          {userPosts.isLoading ? (
            <CircularProgress />
          ) : (
            <PostList posts={userPosts.data ?? []} />
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfilePage;
