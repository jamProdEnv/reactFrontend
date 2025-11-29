import { useState } from "react";
import { useSocket } from "../../context/SocketIOContext";
import { userContext } from "../../context/UserContext";
import { useChat } from "../../hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { EnterMessage } from "./EnterMessage";
import { UserList } from "./UserList";
import { ChatBox } from "./ChatBox";
import classes from "../../CSS/ChatCSS/ChatRoom.module.css";
import { ChatDisplay } from "./ChatDisplay";

export function ChatRoom() {
  const { messages, sendMessage, joinRoom, currentRoom, setCurrentRoom } =
    useChat();
  const { socket } = useSocket();
  const { username } = userContext();

  const [recipient, setRecipient] = useState(null);
  const [users, setUsers] = useState([]);
  const [displayedUser, setDisplayedUser] = useState(null);
  function handleSelect(user) {
    console.log(user);
    // deterministic
    const privateRoom = [username, user].sort().join("_");
    // joinRoom(privateRoom); // updates currentRoom and joins the private room
    setDisplayedUser(user);
    socket.emit("chat.join", privateRoom);
    joinRoom(privateRoom);
  }

  // --- Conditional rendering based on socket connection ---
  // if (status !== "connected") {
  //   return (
  //     <div className={classes.chatRoomContainer}>
  //       <p className={classes.loadingText}>Connecting to chat...</p>
  //     </div>
  //   );
  // }
  // const { sub } = jwtDecode(token);

  // Fetch current user info using react-query
  // const {
  //   data: currentUser,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["users", sub],
  //   queryFn: () => getUserInfo(sub),
  // });

  // const currentUser = user?.username;
  // if (isLoading || !currentUser) return <div>Loading...</div>;
  return (
    // <div className={classes.chatRoomContainer}>
    //   <button onClick={() => setCurrentRoom("public")}>Public</button>
    //   <UserList onSelectUser={handleSelect} />
    //   {/*-------------------- I Need A To Create A List Of Available Users For Chatting -------------------- */}
    //   <div style={{ fontWeight: "bold", margin: "8px 0" }}>
    //     Current Room: {currentRoom}
    //   </div>
    //   <ChatBox onSend={sendMessage} messages={messages} />
    //   {/* {messages.map((message, index) => (
    //     <ChatMessage key={index} {...message} />
    //   ))}
    //   <EnterMessage onSend={sendMessage} /> */}
    // </div>

    <div className={classes.chatRoomContainer}>
      <ChatDisplay
        users={users}
        messages={messages}
        onSend={sendMessage}
        onSelectUser={handleSelect}
        currentRoom={currentRoom}
        displayedUser={displayedUser}
      />
    </div>
  );
}
