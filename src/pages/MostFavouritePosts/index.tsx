import PostList from "@/components/PostList";
import { useApiSWR } from "@/hooks/use-api";
import { CircularProgress, Divider, Input } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const MostFavouritePostsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tags = searchParams.get("tags");
  const [search, setSearch] = useState("");

  const newSearchParams = new URLSearchParams();
  tags && newSearchParams.append("tags", tags);
  search && newSearchParams.append("search", search);
  newSearchParams.append("order", "favourite");

  const fetchUrl = `/post/newest?${newSearchParams}`;

  const post = useApiSWR<PostDynamic[]>(fetchUrl, {
    requireAuth: false,
  });

  if (post.isLoading) return <CircularProgress />;
  if (post.error) return <>Unexpected error {post.error}</>;

  const { data } = post;

  const handleSearch = (value: string) => {
    setSearch(value);
    setSearchParams({ ...searchParams, search: value });
  };

  return (
    <div className="max-auto">
      <h2 className="text-2xl text-center">
        Most favourite posts{" "}
        {tags && (
          <>
            with tag: <strong>{tags}</strong>
          </>
        )}
      </h2>
      <Input
        className="my-3"
        placeholder="Search posts"
        value={search}
        onValueChange={handleSearch}
      />
      <Divider className="my-3" />

      <PostList posts={data ?? []} />
    </div>
  );
};
export default MostFavouritePostsPage;
