import { userContext } from "../../context/UserContext";
import { EnterMessage } from "./EnterMessage";
import { ChatMessage } from "./ChatMessage";
import classes from "../../CSS/ChatCSS/ChatBox.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import { Minimize } from "@mui/icons-material";
import { Close } from "@mui/icons-material";

import { CropSquare } from "@mui/icons-material";
import { useState } from "react";
import { UserList } from "./UserList";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

export function ChatBox({
  messages,
  onSend,
  displayedUser,
  onSelectUser,
  users,
}) {
  const { username } = userContext();
  const { adminUsername } = useAdmin();
  const [clicked, setClicked] = useState(false);
  const [minimize, setMinimized] = useState(false);
  const [token] = useAuth();

  {
    /* Floating Chat Icon */
  }
  const handleChatClick = () => {
    if (!token) {
      alert("Cannot open chat: you are logged out.");
      return;
    }

    if (!username && !adminUsername) {
      alert("Cannot open chat: please create a temporary account.");
      return;
    }

    // If everything is fine, toggle the chatbox
    setClicked(!clicked);
  };

  return (
    <>
      <div className={classes.chatboxMain}>
        <button
          className={classes.chatboxIconButton}
          onClick={
            handleChatClick
            // () => {
            // if (!username && !adminUsername) {
            //   alert("Please Create a temporary account to chat.");
            //   return;
            // }
            // if ((username || adminUsername) && !clicked) {
            //   {
            /*O P E N S  T H E  C H A T B O X */
            //     }
            //     setClicked(true);
            //   } else {
            //     setClicked(false);
            //   }
            // }
          }
        >
          <ChatIcon style={{ fontSize: 30, color: "#fff" }} />
        </button>

        {/* Don't Render The Box Only The Button */}
        {(clicked && !username && !adminUsername) ||
          (!token && (
            <button
              className={classes.chatboxIconButton}
              onClick={
                // () => setClicked(false)
                handleChatClick
              }
            >
              <ChatIcon
                className={classes.icon}
                style={{ fontSize: 30, color: "black" }}
              />
            </button>
          ))}

        {clicked && !minimize && token && (
          <div
            className={`${classes.chatbox} ${classes.chatboxMinimizedContainer}`}
          >
            <header className={classes.chatboxHeader}>
              <div className={classes.chatboxButtonDiv}>
                <div className={classes.chatboxButtons}>
                  <h3 className={classes.userList}>
                    <UserList onSelectUser={onSelectUser} users={users} />
                  </h3>
                </div>
              </div>
            </header>
            <div className={classes.chatboxContainer}>
              <div>
                {messages.map((message, index) => {
                  const myUsername = message.username === username;
                  return (
                    <>
                      <div
                        key={index}
                        className={`${classes.chatboxMessage} ${myUsername ? classes.chatboxMR : classes.chatboxML}`}
                      >
                        <div
                          className={`${classes.chatboxBubble} ${myUsername ? classes.chatboxRB : classes.chatboxLB}`}
                        >
                          <ChatMessage {...message} />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className={classes.chatboxInput}>
              <EnterMessage onSend={onSend} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
