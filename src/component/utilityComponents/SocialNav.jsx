import classes from "../../CSS/SocialNavPage.module.css";
import { Link } from "react-router-dom";
export function SocialNav() {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.links}>
        <li>
          {" "}
          <Link to={"/B8w6/S4L3/p/Qt9m/Vx2k/Ko7r"}>Blog</Link>
        </li>
        <li id={"mobile"} className={classes.mobile}>
          <Link to={"/C7k9/R2T8/j/Fi3l/Hv6q/Yp1m"}>Chat</Link>
        </li>
      </ul>
    </nav>
  );
}
