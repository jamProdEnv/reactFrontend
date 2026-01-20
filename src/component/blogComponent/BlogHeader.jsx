import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import classes from "../../CSS/BlogHeader.module.css";
import { Link } from "react-router-dom";
import { User } from "../chatComponent/User";
import { Admin } from "../adminComponent/Admin";
export function BlogHeader({ onTagSelect }) {
  const [token, role] = useAuth();
  const tags = [
    "blog",
    "informational",
    "wild life",
    "personal",
    "technology",
    "casual",
  ];

  if (token) {
    const { sub } = jwtDecode(token);
    return (
      <div className={classes.container}>
        <header className={classes.header}>
          {/* <nav className={classes.nav}>
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
          </nav> */}
          <nav className={classes.nav}>
            <ul className={classes.links}>
              {tags.map((tag) => (
                <li
                  key={tag}
                  onClick={() => {
                    onTagSelect(tag);
                    console.log("Selected tag:", tag); // logs the tag clicked}
                  }}
                  className={classes.tag}
                  role="button"
                  tabIndex={0}
                >
                  <span className={classes.tag}>{tag}</span>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {role === "admin" ? (
          <h3>
            <Admin id={sub} />
          </h3>
        ) : (
          <h3>
            Logged in as <User id={sub} />
          </h3>
        )}
      </div>
    );
  }
  return (
    <div className={classes.login}>
      <Link to={"/L2m8/Q5D3/k/Ft9r/Pw6v/Gx1n"}>Log In</Link> |{" "}
      <Link to={"/S1x4/H9P7/v/Rz2k/Mq8p/Lj5w"}>Sign Up</Link>
      <h3>Blog</h3>
    </div>
  );
}

export default BlogHeader;
