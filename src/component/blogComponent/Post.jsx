import { memo } from "react";
import { User } from "../chatComponent/User";
import classes from "../../CSS/Post.module.css";
export function Post({ title, contents, author }) {
  return (
    <article className={classes.container}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.contents}>
        <p>"{contents}"</p>
      </div>
      <div className={classes.author}>
        {author && (
          <p>
            Written by <User id={author} />
          </p>
        )}
      </div>
    </article>
  );
}

export default memo(Post);
