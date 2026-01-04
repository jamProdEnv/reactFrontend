import { Link } from "react-router-dom";
import classes from "../CSS/GlobalHeader.module.css";
import { GlobalStatus } from "./GlobalStatus";
export function GlobalHeader() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.div1}>
          <h1>Wsjr</h1>
          <div className={classes.status}>
            <GlobalStatus />
          </div>
        </div>

        <div className={classes.div2}>
          <nav className={classes.nav}>
            <ul className={classes.links}>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/resume"}>Profile</Link>
              </li>

              <li>
                <Link to={"/blog"}>Blog</Link>
              </li>
              <li id={"mobile"} className={classes.mobile}>
                <Link to={"/chat"}>Chat</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
