import { useEffect, useState } from "react";
import { getUsers } from "../../api/Users";
import { userContext } from "../../context/UserContext";
import classes from "../../CSS/ChatCSS/UserList.module.css";
import { getAdmins } from "../../api/Admin";
import { useAuth } from "../../context/AuthContext";

export function UserList({ onSelectUser }) {
  //  Takes A Prop
  //    Admin Selects A User To Message From The List. On Click, The Room Is Selected And The Messages Are Displayed.
  //    The Messages Are Emitted To The Room With IO And The Individual Users See The
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = userContext();
  const [, role] = useAuth();
  // users.push("public");
  // useEffect(() => {
  //   //  Load Users And Handle Side Effects.
  //   async function loadUsers() {
  //     try {
  //       const res = await getUsers(); // fetch static user list
  //       console.log("All Users:", res);
  //       if (res) setUsers(res);
  //     } catch (err) {
  //       console.error("Cannot Load Users", err);
  //     } finally {
  //       //  After Retrieving Response, Set Loading To False.
  //       setLoading(false);
  //     }
  //   }
  //   loadUsers();

  //   async function loadAdmins() {
  //     try {
  //       const res = await getAdmins();
  //       console.log("All Admins:", res);
  //       if (res) setAdmins(res);
  //     } catch (err) {
  //       console.error("Cannot Load Users", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadAdmins();
  // }, []);

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
  if (role === "user") {
    return (
      <div className={classes.container}>
        <select
          className={classes.userList}
          value={admins.forEach((admin) => admin.username)}
          onChange={(e) => onSelectUser(e.target.value)}
          style={{ padding: "4px 8px", borderRadius: "4px" }}
        >
          <option value="" disabled>
            Select Admin
          </option>
          <option value="public">Public</option>
          {admins.map((a) => (
            <option key={a._id} value={a.username}>
              {a.username}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (role === "admin") {
    return (
      <div className={classes.container}>
        <select
          className={classes.userList}
          value={users.forEach((user) => user.username)}
          onChange={(e) => onSelectUser(e.target.value)}
          style={{ padding: "4px 8px", borderRadius: "4px" }}
        >
          <option value="" disabled>
            Select User
          </option>
          <option value="public">Public</option>
          {users
            // .filter((u) => u.username !== username)
            .map((u) => (
              <option key={u._id} value={u.username}>
                {u.username}
              </option>
            ))}
        </select>
      </div>
      // <ul className="user-list">
      //   {users
      //     .filter((user) => user.username !== username)
      //     .map((user) => (
      //       <li
      //         key={user._id}
      //         className="user-item"
      //         onClick={() => onSelectUser(user.username)}
      //         style={{
      //           cursor: "pointer",
      //           padding: "8px",
      //           borderBottom: "1px solid #ddd",
      //         }}
      //       >
      //         {user.username}
      //       </li>
      //     ))}
      // </ul>
    );
  }
}
