import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../../api/Posts";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import classes from "../../CSS/PostCSS/CreatePost.module.css";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [token] = useAuth();
  const [tags, setTags] = useState("");
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost(token, {
        title,
        contents,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    //  If The Creation Is Successful, Fetch The Posts So They Can Be Posted To The UI.
    onSuccess: () => {
      queryClient.invalidateQueries(["queries"]);
      setTitle("");
      setContents("");
    },
    onError: () => alert("Cannot Create Post."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };

  if (!token)
    return (
      <div className={classes.createPostContainer}>
        <p>
          Please <Link to="/Login">Login</Link> To Create A Post.
        </p>
      </div>
    );
  return (
    <div className={classes.createPostContainer}>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <div className={classes.createPostTitleTags}>
          <div className={classes.createPostTitle}>
            <label className={classes.createPostLabel} htmlFor="create-title">
              Title:{" "}
            </label>
            <input
              type="text"
              placeholder="T I T L E"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={classes.createPostTags}>
            <label className={classes.createPostLabel} htmlFor="create-tags">
              Tags:
            </label>
            <input
              type="text"
              value={tags}
              placeholder="#  T A G"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.createPostBlock}>
          <textarea
            className={classes.createPostTextArea}
            placeholder={"C R E A T E  P O S T"}
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />

          <div className={classes.createPostSubmit}>
            <input
              className={classes.createPostInput}
              type="submit"
              value={
                createPostMutation.isPending ? ". . .Posting" : "Create Post"
              }
              disabled={createPostMutation.isPending}
            />
            {createPostMutation.isSuccess ? (
              <>
                {/* <br /> */}
                Post created successfully!
              </>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
