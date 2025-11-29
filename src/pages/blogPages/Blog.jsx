import { useState } from "react";
import { CreatePost } from "../../component/blogComponent/CreatePost";
import { PostFilter } from "../../component/blogComponent/PostFilter";
import { PostSorting } from "../../component/blogComponent/PostSorting";
import { BlogHeader } from "../../component/blogComponent/BlogHeader";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/Posts";
import { Post } from "../../component/blogComponent/Post";
import { PostList } from "../../component/blogComponent/PostList";
import { BlogDisplay } from "../../component/blogComponent/BlogDisplay";
import classes from "../../CSS/Blog.module.css";
export function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("ascending");

  // const queryKey = ["posts", { author, sortBy, sortOrder }];
  const postQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    // queryKey: queryKey,
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });

  //  Is it available?
  const posts = postQuery.data ?? [];
  return (
    <>
      <div className={classes.container}>
        <BlogDisplay
          posts={posts}
          author={author}
          onAuthorChange={setAuthor}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(field, order) => {
            setSortBy(field);
            setSortOrder(order);
          }}
        />
      </div>
    </>
  );
}
