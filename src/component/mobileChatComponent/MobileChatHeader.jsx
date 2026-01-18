import { Link } from "react-router-dom";
import { useSocket } from "../../context/SocketIOContext";
import { jwtDecode } from "jwt-decode";
import { User } from "../chatComponent/User";
import { useAuth } from "../../context/AuthContext";

export function MobileChatHeaderHeader() {
  const [token, role, setToken] = useAuth();
  const { socket } = useSocket();

  const handleLogout = () => {
    socket.disconnect();
    localStorage.removeItem("token");
    setToken(null);
  };

  console.log(role);
  if (token && role === "admin") {
    const { sub } = jwtDecode(token);
    return (
      <div>
        Logged in as <Admin id={sub} />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  if (token && role === "user") {
    const { sub } = jwtDecode(token);
    return (
      <div>
        Logged in as <User id={sub} />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  return (
    <div>
      <Link to={"/login"}>Log In</Link> | <Link to={"/signup"}>Sign Up</Link>
    </div>
  );
}
