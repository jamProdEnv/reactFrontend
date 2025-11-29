import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({
  username: null,
});

export function UserContextProvider({ children }) {
  const [username, setUserContext] = useState(
    () => localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}

export function userContext() {
  return useContext(UserContext);
}
