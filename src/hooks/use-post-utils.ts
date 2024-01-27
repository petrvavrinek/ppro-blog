import { useApiFetch } from "./use-api";

export const usePostUtils = (post: PostStatic) => {
  const useApi = useApiFetch();

  const like = () =>
    useApi(`/post/${post.id}/favourite`, { method: "POST" })
      .then(() => true)
      .catch(() => false);
  const unlike = () =>
    useApi(`/post/${post.id}/favourite`, { method: "DELETE" })
      .then(() => true)
      .catch(() => false);

  if (!post) return null;

  return { like, unlike };
};
