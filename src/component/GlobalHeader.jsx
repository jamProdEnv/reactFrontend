import { Link } from "react-router-dom";
import classes from "../CSS/GlobalHeader.module.css";
import { GlobalStatus } from "./GlobalStatus";
export function GlobalHeader() {
  return (
    <>
      <header className={classes.header}>
        <h1>Wsjr</h1>

        <div className={classes.div2}>
          <nav className={classes.nav}>
            <ul className={classes.links}>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/M4p2/Q8V1/z/Lk7r/Nm2s/Pw9d"}>Profile</Link>
              </li>

              {/* <li>
                <Link to={"/B8w6/S4L3/p/Qt9m/Vx2k/Ko7r"}>Blog</Link>
              </li>
              <li id={"mobile"} className={classes.mobile}>
                <Link to={"/C7k9/R2T8/j/Fi3l/Hv6q/Yp1m"}>Chat</Link>
              </li> */}
              <li className={classes.mobile}>
                <Link to={"/DmK3/BdSQ/v/TIfE/cHQL/RIv1"}>Social</Link>
              </li>
              <li className={classes.desktop}>
                <Link to={"/B8w6/S4L3/p/Qt9m/Vx2k/Ko7r"}>Blog</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={classes.status}>
          <GlobalStatus />
        </div>
      </header>
    </>
  );
}
