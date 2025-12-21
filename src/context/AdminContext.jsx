import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext({
  adminUsername: null,
});

export function AdminContextProvider({ children }) {
  const [adminUsername, setAdminContext] = useState(
    () => localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (adminUsername) {
      localStorage.setItem("username", adminUsername);
    } else {
      localStorage.removeItem("username");
    }
  }, [adminUsername]);

  return (
    <AdminContext.Provider value={{ adminUsername, setAdminContext }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
