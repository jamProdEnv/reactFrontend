import { useState, useMemo, useCallback, lazy, Suspense, memo } from "react";
import { CreatePost } from "../../component/blogComponent/CreatePost";
import { PostFilter } from "../../component/blogComponent/PostFilter";
import { PostSorting } from "../../component/blogComponent/PostSorting";
import { BlogHeader } from "../../component/blogComponent/BlogHeader";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/Posts";
import { Post } from "../../component/blogComponent/Post";
import { PostList } from "../../component/blogComponent/PostList";
// import { BlogDisplay } from "../../component/blogComponent/BlogDisplay";
import classes from "../../CSS/Blog.module.css";

const BlogDisplay = lazy(
  () => import("../../component/blogComponent/BlogDisplay")
);
export function Blog() {
  const [author, setAuthor] = useState("");
  const [searchBy, setSearchBy] = useState(""); // "author" | "tag"
  const [query, setQuery] = useState(""); // text input

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("ascending");

  // const queryKey = ["posts", { author, sortBy, sortOrder }];
  // const postQuery = useQuery({
  //   queryKey: ["posts", { author, sortBy, sortOrder }],
  //   // queryKey: queryKey,
  //   queryFn: () => getPosts({ author, sortBy, sortOrder }),
  //   keepPreviousData: true,
  // });

  const postQuery = useQuery({
    queryKey: ["posts", { searchBy, query, sortBy, sortOrder }],
    queryFn: () => getPosts({ searchBy, query, sortBy, sortOrder }),
    keepPreviousData: true,
  });

  //  Is it available?
  const posts = useMemo(() => postQuery.data ?? [], [postQuery.data]);

  // Stable callback
  const handleSortChange = useCallback((field, order) => {
    setSortBy(field);
    setSortOrder(order);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <Suspense fallback={<p>Loading blog…</p>}>
          {/* <BlogDisplay
            posts={posts}
            author={author}
            onAuthorChange={setAuthor}
            sortBy={sortBy}
            sortOrder={sortOrder}
           
            onSortChange={handleSortChange}
          /> */}
          <BlogDisplay
            posts={posts}
            searchBy={searchBy}
            query={query}
            onSearchByChange={setSearchBy}
            onQueryChange={setQuery}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </Suspense>
      </div>
    </>
  );
}

export default memo(Blog);
