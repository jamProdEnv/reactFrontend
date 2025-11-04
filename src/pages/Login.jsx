import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../api/Users.js";
import { useAuth } from "../context/AuthContext.jsx";
import { userContext } from "../context/UserContext.jsx";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [, setToken] = useAuth();
  const { setUserContext } = userContext();

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      // setToken(data.token);
      setToken(data.token);
      setUserContext(username);
      navigate("/");
    },
    onError: () => alert("failed to login!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link to="/">Back to main page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor="create-username">Username: </label>
        <input
          type="text"
          name="create-username"
          id="create-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-password">Password: </label>
        <input
          type="password"
          name="create-password"
          id="create-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type="submit"
        value={loginMutation.isPending ? "Logging in..." : "Log In"}
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  );
}
