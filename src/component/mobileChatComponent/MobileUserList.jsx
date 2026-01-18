import { useState, useEffect } from "react";
import { getUsers } from "../../api/Users";
import { getAdmins } from "../../api/Admin";
import { useAuth } from "../../context/AuthContext";
import classes from "../../CSS/ChatCSS/MobileUserList.module.css";
export function MobileUserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [, role] = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        const [usersRes, adminsRes] = await Promise.all([
          getUsers(),
          getAdmins(),
        ]);

        if (usersRes) setUsers(usersRes);
        console.log("User Received:", usersRes);
        if (adminsRes) setAdmins(adminsRes);
        console.log("Admin Received:", adminsRes);
      } catch (err) {
        console.error("Cannot load users/admins", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (!role) {
    if (loading) return <div>Loading users...</div>;
  }

  if (role === "admin") {
    return (
      <div>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              value={user.username}
              onClick={() => onSelectUser(user)}
              className={classes.user}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (role === "user") {
    return (
      <main className={classes.container}>
        <ul className={classes.userList}>
          {admins.map((admin) => (
            <li
              key={admin._id}
              value={admin.username}
              onClick={() => onSelectUser(admin)}
              className={classes.user}
            >
              {admin.username}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}
