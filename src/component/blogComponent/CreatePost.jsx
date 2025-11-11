import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../../api/Posts";
import { useAuth } from "../../context/AuthContext";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [token] = useAuth();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }),
    //  If The Creation Is Successful, Fetch The Posts So They Can Be Posted To The UI.
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
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
      <div>
        <p>Please Login To Create A Post.</p>
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <br />

      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />

      <div>
        <input
          type="submit"
          value={createPostMutation.isPending ? ". . .Posting" : "Create Post"}
          disabled={createPostMutation.isPending || !title}
        />
      </div>
    </form>
  );
}
