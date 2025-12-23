import { memo } from "react";
import { User } from "../chatComponent/User";
import classes from "../../CSS/Post.module.css";
import { useAuth } from "../../context/AuthContext";
import { Admin } from "../adminComponent/Admin";
export function Post({ title, contents, author }) {
  const [, role] = useAuth();
  return (
    <article className={classes.container}>
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
      </div>
    </article>
  );
}

export default memo(Post);
