import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginAdmin } from "../../api/Admin";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminContext } = useAdmin();
  const [, , setToken] = useAuth();
  const nav = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => loginAdmin({ username, password }),
    onSuccess: (data) => {
      setToken(data.token);
      setAdminContext(username);
      nav("/");
    },
    onError: (error) => {
      alert("Unable to Login!");
      console.error(error);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          placeholder={"Username or Email"}
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={loginMutation.isPending ? ". . .Logging in" : "Login"}
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  );
}
