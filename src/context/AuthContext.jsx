import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const role = token ? jwtDecode(token).role : null;
  console.log(role);
  // Whenever token changes, update localStorage
  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  //  Same thing as setToken but used for Login.jsx in specific
  // const login = (newToken) => {
  //   if (newToken) {
  //     localStorage.setItem("token", newToken);
  //     setUser(jwtDecode(newToken));
  //   } else {
  //     logout();
  //   }
  //   setTokenState(newToken);
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setToken(null);
  // };

  return (
    <AuthContext.Provider value={{ token, role, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export function useAuth() {
  const { token, role, setToken } = useContext(AuthContext);
  return [token, role, setToken];
  // return useContext(AuthContext);
}
