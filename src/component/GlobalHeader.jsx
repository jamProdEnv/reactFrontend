import { Link } from "react-router-dom";
import classes from "../CSS/GlobalHeader.module.css";
export function GlobalHeader() {
  return (
    <header className={classes.globalHeader}>
      <nav>
        <ul className={classes.globalHeaderUL}>
          <li>
            <Link to={"/"}>Main</Link>
          </li>
          <li>
            <Link to={"/resume"}>Profile</Link>
          </li>
          <li>
            <Link to={"/chat"}>Chat</Link>
          </li>
          <li>
            <Link to={"/blog"}>Blog</Link>
          </li>
          <li>
            <Link to={"/account"}>Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
