import { Link } from "react-router-dom";
import classes from "../CSS/GlobalHeader.module.css";
import { GlobalStatus } from "./GlobalStatus";
export function GlobalHeader() {
  return (
    <>
      <header className={classes.globalHeader}>
        <div className={classes.headerDiv1}>
          <h1 className={classes.globalH1}>Portfolio</h1>
          <div className={classes.globalStatus}>
            <GlobalStatus />
          </div>
        </div>

        <nav className={classes.globalNav}>
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
          </ul>
        </nav>
      </header>
    </>
  );
}
