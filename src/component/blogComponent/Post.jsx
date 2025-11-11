import { User } from "../chatComponent/User";
export function Post({ title, content, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{content}</div>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  );
}
