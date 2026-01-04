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
export function MobileChatDisplay() {
  const [displayedUser, setDisplayedUser] = useState();
  const { messages, sendMessage, joinRoom, currentRoom, setCurrentRoom } =
    useChat();
  const { socket } = useSocket();
  const { username } = userContext();

  function handleSelect(user) {
    console.log(user);
    // deterministic
    const privateRoom = [username, user.username].sort().join("_");
    // joinRoom(privateRoom); // updates currentRoom and joins the private room
    setDisplayedUser(user);
    socket.emit("chat.join", privateRoom);
    joinRoom(privateRoom);
  }

  return (
    <>
      <div className={classes.container}>
        <section className={classes.userBlock}>
          {/* Render Rooms */}
          <MobileUserList onSelectUser={handleSelect} />
        </section>

        <main className={classes.messagesBlock}>
          <div>
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
          <div>
            <EnterMobileMessage onSend={sendMessage} />
          </div>
        </main>
      </div>
    </>
  );
}
