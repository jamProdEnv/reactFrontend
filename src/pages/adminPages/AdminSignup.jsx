import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createAdmin } from "../../api/Admin";

export function AdminSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signupMutation = useMutation({
    mutationFn: () => createAdmin({ username, password, email }),
    onSuccess: () => {
      setUsername(username);
      setPassword(password);
      setEmail(email);
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
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

      <div>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={signupMutation.isPending ? ". . .Signing up." : "Sign up"}
        disabled={!username || !password || !email || signupMutation.isPending}
      />
    </form>
  );
}
