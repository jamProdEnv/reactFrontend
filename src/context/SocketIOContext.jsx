import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

export const SocketIOContext = createContext({
  socket: null,
  status: "waiting",
  error: null,
  onlineUsers: [],
});

export const SocketIOContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("waiting");
  const [error, setError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [token, setToken] = useAuth();

  useEffect(() => {
    if (token) {
      const socket = io(import.meta.env.VITE_BACKEND_PROD_URL, {
        query: window.location.search.substring(1),
        auth: { token },
      });

      socket.on("connect", () => {
        setStatus("connected");
        setError(null);
        // request the current online users
        socket.emit("users.request");
      });
      socket.on("connect_error", (error) => {
        setStatus("error");
        console.error(error);
        if ((error = "Authentication failed: invalid token")) {
          socket.disconnect();
          localStorage.removeItem("token");
          setToken(null);
          setStatus("waiting");
        }
        setError(error);
      });

      socket.on("disconnect", () => setStatus("disconnected"));
      // Listen for online users from server
      socket.on("users.online", (users) => {
        console.log("Received online users:", users);
        setOnlineUsers(users);
      });
      setSocket(socket);
    }
  }, [token, setSocket, setStatus, setError]);

  return (
    <SocketIOContext.Provider value={{ socket, status, error, onlineUsers }}>
      {children}
    </SocketIOContext.Provider>
  );
};

SocketIOContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export function useSocket() {
  return useContext(SocketIOContext);
}
