import { useEffect, useState } from "react";
import { getUsers } from "../../api/Users";
import { userContext } from "../../context/UserContext";

export function UserList({ onSelectUser }) {
  //  Takes A Prop
  //    Admin Selects A User To Message From The List. On Click, The Room Is Selected And The Messages Are Displayed.
  //    The Messages Are Emitted To The Room With IO And The Individual Users See The
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = userContext();
  users.push("public");
  useEffect(() => {
    //  Load Users And Handle Side Effects.
    async function loadUsers() {
      try {
        const res = await getUsers(); // fetch static user list
        console.log("All Users:", res);
        if (res) setUsers(res);
      } catch (err) {
        console.error("Cannot Load Users", err);
      } finally {
        //  After Retrieving Response, Set Loading To False.
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <select
      value={users.forEach((user) => user.username)}
      onChange={(e) => onSelectUser(e.target.value)}
      style={{ padding: "4px 8px", borderRadius: "4px" }}
    >
      <option value="" disabled>
        Select User
      </option>
      <option value="public">Public</option>
      {users
        .filter((u) => u.username !== username)
        .map((u) => (
          <option key={u._id} value={u.username}>
            {u.username}
          </option>
        ))}
    </select>
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
