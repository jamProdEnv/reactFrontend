import { User } from "../chatComponent/User";
import classes from "../../CSS/Post.module.css";
export function Post({ title, contents, author }) {
  return (
    <article className={classes.container}>
      <h3 className={classes.postTitle}>{title}</h3>
      <div className={classes.postContents}>
        <p>"{contents}"</p>
      </div>
      <div>
        {author && (
          <em>
            <br />
            Written by <User id={author} />
          </em>
        )}
      </div>
    </article>
  );
}
