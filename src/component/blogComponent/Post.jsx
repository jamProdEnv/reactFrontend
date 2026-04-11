import { memo } from "react";
import { User } from "../chatComponent/User";
import classes from "../../CSS/Post.module.css";
import { useAuth } from "../../context/AuthContext";
import { Admin } from "../adminComponent/Admin";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deletePosts } from "../../api/Posts";
import { all } from "three/src/nodes/math/MathNode.js";
import { useState } from "react";
import { updatePost } from "../../api/Posts";
import { useNavigate } from "react-router-dom";

export function Post({ _id, title, contents, author, tags, createdAt }) {
  const [token, role] = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContents, setUpdatedContents] = useState("");
  const [updatedTags, setUpdatedTags] = useState("");
  const navigate = useNavigate();
  const formattedDate = new Date(createdAt).toLocaleString();
   const deleteMutation = useMutation({
    mutationFn: () => deletePosts(token, _id),

    onSuccess: () => {
      queryClient.invalidateQueries({
     
      queryKey: ["posts"],
    // exact: false,
    // refetchType: "active",
      });
  
  
    },

    onError: () => alert("Failed to delete post"),
  });

  const updateMutation = useMutation({
  mutationFn: ({ id, data }) => updatePost(token, id, data),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    // navigate("/B8w6/S4L3/p/Qt9m/Vx2k/Ko7r")
    setIsEditing(false);
  },

  onError: () => alert("Update failed"),
});


  return   (
         
    <article className={classes.container}>
      { !isEditing ? (
        <>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.contents}>
        <p>"{contents}"</p>
      </div>
      <div className={classes.author}>
        {author && (
          <div>
            {/* Written by <Admin id={author} /> */}
            Written by {author.username}
          </div>
        )}

        {/* {role === "user" && author && (
          <div>
            Written by <User id={author} />
          </div>
        )} */}
        <div className={classes.tags}>
          {/* {tags !== "" || tags !== null ? (
            <span>tags: {tags?.split(" ")}</span>
          ) : (
            <span>tags: </span>
          )} */}
          {tags?.map((tag) => (
            <span key={tag} className={classes.tag}>
              #{tag}
            </span>
          ))}
        </div>
          <div>
            {formattedDate}
          </div>
      </div>

       {/* ✅ DELETE BUTTON */}
      {role === "admin" && (
        <button onClick={() => deleteMutation.mutate()}>
          Delete
        </button>
      )}
      {role === "admin" && (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      
      </>
    ) : (
      <>
       <input
            placeholder="Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />

          <textarea
            placeholder="Create Post"
            value={updatedContents}
            onChange={(e) => setUpdatedContents(e.target.value)}
          />

          <button
            onClick={() =>
              updateMutation.mutate({
                id: _id,
                data: {
                  title: updatedTitle,
                  contents: updatedContents,
                  tags,
                },
              })
            }
          >
            Save
          </button>

          <button onClick={() => setIsEditing(false)}>
            Cancel
          </button>
      </>

    )
    }
    </article>

     
  );
}

export default memo(Post);
