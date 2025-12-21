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

  {
    /* Floating Chat Icon */
  }

  return (
    <>
      <div className={classes.chatboxMain}>
        <button
          className={classes.chatboxIconButton}
          onClick={() => {
            if (!username && !adminUsername) {
              alert("Please Create a temporary account to chat.");
              return;
            }
            if ((username || adminUsername) && !clicked) {
              {
                /*O P E N S  T H E  C H A T B O X */
              }
              setClicked(true);
            } else {
              setClicked(false);
            }
          }}
        >
          <ChatIcon style={{ fontSize: 30, color: "#fff" }} />
        </button>

        {/* Don't Render The Box Only The Button */}
        {clicked && !username && !adminUsername && (
          <button
            className={classes.chatboxIconButton}
            onClick={() => setClicked(false)}
          >
            <ChatIcon style={{ fontSize: 30, color: "#fff" }} />
          </button>
        )}

        {clicked && !minimize && (
          <div
            className={`${classes.chatbox} ${classes.chatboxMinimizedContainer}`}
          >
            <header className={classes.chatboxHeader}>
              {/* F L E X  T H E  H E A D ER  */}
              <div className={classes.chatboxButtonDiv}>
                <div className={classes.chatboxButtons}>
                  {/* <button
                    className={classes.chatboxMinimize}
                    onClick={() => setMinimized(true)}
                  >
                    <Minimize style={{ fontisze: 30, color: "black" }} />
                  </button>
                 
                 
                  <button
                    className={classes.chatboxClose}
                    onClick={() => setClicked(false)}
                  >
                    <Close />
                  </button> */}
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
