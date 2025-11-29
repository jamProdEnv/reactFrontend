import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketIOContext";
import { Header } from "./chatComponent/Header";
import { Status } from "./chatComponent/Status";
import { Link } from "react-router-dom";
import { User } from "./chatComponent/User";
import { jwtDecode } from "jwt-decode";
import classes from "../CSS/GlobalStatus.module.css";
import { useState } from "react";

export function GlobalStatus() {
  const [token, setToken] = useAuth();
  const { socket, status, error } = useSocket();
  const [clicked, setClicked] = useState(false);

  const handleLogout = () => {
    socket.disconnect();
    localStorage.removeItem("token");
    setToken(null);
  };
  if (token) {
    const { sub } = jwtDecode(token);

    return (
      <div className={classes.container}>
        <nav>
          <div className={classes.dropdown}>
            <div className={classes.dropdownLabel}>
              <div className={classes.statusContainer}>
                <div className={classes.status}>
                  <p className={classes.statusDisplay}>
                    Socket Status: <b>{status} </b>
                    {error && <i>- {error.message}</i>}
                  </p>
                </div>
              </div>
              <p className={classes.logout}>
                <User id={sub} />
              </p>
            </div>
            <div className={classes.dropdownMenu}>
              <ul className={classes.submenu}>
                <li>
                  <Link to={"/account"}>Account</Link>
                </li>
                <li>
                  <p onClick={handleLogout}>Logout </p>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  return (
    <section>
      <div>
        Socket Status: <b>{status} </b>
        {error && <i>- {error.message}</i>}
      </div>
      <div>
        <Link to={"/login"}>Log In</Link> | <Link to={"/signup"}>Sign Up</Link>
      </div>
    </section>
  );
}
