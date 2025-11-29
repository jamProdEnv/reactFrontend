import { Fragment } from "react";
import { Post } from "./Post";
import classes from "../../CSS/PostCSS/PostList.module.css";

export function PostList({ posts = [] }) {
  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <p key={post._id}>
          <Post {...post} />
        </p>
      ))}
    </div>
  );
}
