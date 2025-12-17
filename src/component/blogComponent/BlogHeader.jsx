import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import classes from "../../CSS/BlogHeader.module.css";
import { Link } from "react-router-dom";
import { User } from "../chatComponent/User";
export function BlogHeader() {
  const [token] = useAuth();
  if (token) {
    const { sub } = jwtDecode(token);
    return (
      <>
        <header className={classes.header}>
          <nav className={classes.nav}>
            <ul className={classes.links}>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Informational</a>
              </li>
              <li>
                <a href="#">Wild Life</a>
              </li>
              <li>
                <a href="#">Personal</a>
              </li>
              <li>
                <a href="#">Technology</a>
              </li>
              <li>
                <a href="#">Casual</a>
              </li>
            </ul>
          </nav>
        </header>
        <h3>
          Logged in as <User id={sub} />
        </h3>
      </>
    );
  }
  return (
    <div>
      {/* <Link to={"/login"}>Log In</Link> | <Link to={"/signup"}>Sign Up</Link> */}
      <h3>Blog</h3>
    </div>
  );
}

export default BlogHeader;
