import { useState } from "react";
import { CreatePost } from "../../component/blogComponent/CreatePost";
import { PostFilter } from "../../component/blogComponent/PostFilter";
import { PostSorting } from "../../component/blogComponent/PostSorting";
import { BlogHeader } from "../../component/blogComponent/BlogHeader";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/Posts";
import { Post } from "../../component/blogComponent/Post";
import { PostList } from "../../component/blogComponent/PostList";
import classes from "../../CSS/BlogDisplay.module.css";
export function BlogDisplay({
  posts,
  author,
  onAuthorChange,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  const postQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });
  return (
    <>
      <div className={classes.blogDisplayContainer}>
        <BlogHeader />
        <CreatePost />

        <PostFilter field="author" value={author} onChange={onAuthorChange} />
        <br />

        <PostSorting
          fields={["createdAt", "updatedAt"]}
          value={sortBy}
          orderValue={sortOrder}
          onOrderChange={(orderValue) => onSortChange(sortBy, orderValue)}
        />

        <br />
        <PostList posts={posts} />
      </div>
    </>
  );
}
