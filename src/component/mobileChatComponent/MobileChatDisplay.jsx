import { UserList } from "../chatComponent/UserList";
import { MobileChat } from "../../pages/chatPages/MobileChat";
import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";
import classes from "../../CSS/ChatCSS/MobileChatDisplay.module.css";
import { MobileUserList } from "./MobileUserList";
import { useChat } from "../../hooks/useChat";
import { EnterMobileMessage } from "./EnterMobileMessage";
import { userContext } from "../../context/UserContext";
import { MobileChatMessage } from "./MobileChatMessage";
import { useSocket } from "../../context/SocketIOContext";
import { Link } from "react-router-dom";
import KeyboardTab from "@mui/icons-material/KeyboardTab";
import { MobileChatHeader } from "./MobileChatHeader";
export function MobileChatDisplay() {
  const [userListOpen, setUserListOpen] = useState(true);
  const [displayedUser, setDisplayedUser] = useState();
  const { messages, sendMessage, joinRoom, currentRoom, setCurrentRoom } =
    useChat();
  const { socket } = useSocket();
  const { username } = userContext();
  const [, token] = useAuth();

  function handleSelect(user) {
    console.log(user);
    // deterministic
    const privateRoom = [username, user.username].sort().join("_");
    // joinRoom(privateRoom); // updates currentRoom and joins the private room
    setDisplayedUser(user);
    socket.emit("chat.join", privateRoom);
    joinRoom(privateRoom);
    // ✅ CLOSE USER LIST
    setUserListOpen(false);
  }

  if (!username || !token) {
    return (
      <div className={classes.login}>
        {/* Please <Link to={"/login"}>Login</Link> or{" "}
        <Link to={"/signup"}>Signup</Link> To View Your Messages. */}
        <MobileChatHeader />
      </div>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <section
          className={userListOpen ? classes.userBlock : classes.closeUserBlock}
        >
          {/* Render Rooms */}
          <h3>Active Chats</h3>
          <MobileUserList onSelectUser={handleSelect} />
        </section>

        <main
          className={
            userListOpen ? classes.closeMessagesBlock : classes.messagesBlock
          }
        >
          <div className={classes.messagesBlockHeader}>
            <KeyboardTab
              className={classes.return}
              onClick={() => setUserListOpen(true)}
            />

            <h2 className={"username"}>{username}</h2>
          </div>

          <div className={classes.messageBox}>
            {messages.map((message, index) => {
              const myUsername = message.username === username;
              return (
                <>
                  <div
                    key={index}
                    className={`${classes.message} ${myUsername ? classes.messageRight : classes.messageLeft}`}
                  >
                    <div
                      className={`${classes.bubble} ${myUsername ? classes.rightBubble : classes.leftBubble}`}
                    >
                      <MobileChatMessage {...message} />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </main>
        <div
          className={userListOpen ? classes.closeMessagesBlock : classes.input}
        >
          <EnterMobileMessage onSend={sendMessage} />
        </div>
      </div>
    </>
  );
}
