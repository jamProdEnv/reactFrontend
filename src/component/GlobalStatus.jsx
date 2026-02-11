import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketIOContext";
import { Header } from "./chatComponent/Header";
import { Status } from "./chatComponent/Status";
import { Link } from "react-router-dom";
import { User } from "./chatComponent/User";
import { jwtDecode } from "jwt-decode";
import classes from "../CSS/GlobalStatus.module.css";
import { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Diversity2Outlined } from "@mui/icons-material";
import { Admin } from "./adminComponent/Admin";

export function GlobalStatus() {
  const [token, role, setToken] = useAuth();
  const { socket, status, error } = useSocket();
  const [clicked, setClicked] = useState(false);

  const handleLogout = () => {
    socket.disconnect();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
  };
  if (token) {
    const { sub } = jwtDecode(token);
    console.log(role);
    return (
      <div className={classes.container}>
        <nav>
          <div className={classes.dropdown}>
            <div className={classes.dropdownLabel}>
              <div
                className={classes.svg}
                onClick={() => {
                  if (!clicked) {
                    setClicked(true);
                  } else {
                    setClicked(false);
                  }
                }}
              >
                <AccountBoxIcon />
              </div>
            </div>
            {clicked && (
              <div className={classes.dropdownMenu}>
                <ul className={classes.submenu}>
                  <li>
                    <div>
                      <AccountBoxIcon />
                    </div>
                    <div className={classes.statusContainer}>
                      <div className={classes.status}>
                        <p className={classes.statusDisplay}>
                          Socket Status: <b>{status} </b>
                          {error && <i>- {error.message}</i>}
                        </p>
                      </div>
                    </div>

                    {role === "admin" ? <Admin id={sub} /> : <User id={sub} />}
                    {/* <Admin id={sub} /> */}
                  </li>
                  <li>
                    <Link to={"/account"}>Account</Link>
                  </li>
                  <li
                    onClick={() => {
                      handleLogout();
                      if (clicked) {
                        setClicked(false);
                      }
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      {/* <div className={classes.offline}>
        <AccountBoxIcon />
        <p className={classes.statusDisplay}>
          Socket Status: <b>{status} </b>
          {error && <i>- {error.message}</i>}
        </p>
      </div> */}
      <div className={classes.login}>
        <Link to={"/L2m8/Q5D3/k/Ft9r/Pw6v/Gx1n"}>Log In</Link> |{" "}
        <Link to={"/S1x4/H9P7/v/Rz2k/Mq8p/Lj5w"}>Sign Up</Link>
      </div>
    </div>
  );
}
