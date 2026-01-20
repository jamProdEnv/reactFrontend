import { Link } from "react-router-dom";
import { useSocket } from "../../context/SocketIOContext";
import { jwtDecode } from "jwt-decode";
import { User } from "../chatComponent/User";
import { useAuth } from "../../context/AuthContext";

export function MobileChatHeader() {
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
      <Link to={"/L2m8/Q5D3/k/Ft9r/Pw6v/Gx1n"}>Log In</Link> |{" "}
      <Link to={"/S1x4/H9P7/v/Rz2k/Mq8p/Lj5w"}>Sign Up</Link>
    </div>
  );
}
