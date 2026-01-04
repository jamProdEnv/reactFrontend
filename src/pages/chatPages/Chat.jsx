import { ChatRoom } from "../../component/chatComponent/ChatRoom";
import { Header } from "../../component/chatComponent/Header";
import { Status } from "../../component/chatComponent/Status";
import { MobileChatDisplay } from "../../component/mobileChatComponent/MobileChatDisplay";
import { useSocket } from "../../context/SocketIOContext";
import classes from "../../CSS/ChatCSS/Chat.module.css";
import { MobileChat } from "./MobileChat";

export function Chat() {
  const { status } = useSocket();

  return (
    <div style={{ padding: 8 }}>
      {/* <Header />
      <br />
      <hr />
      <br />
      <Status />
      <br />
      <hr />
      <br /> */}
      {/* {status === "connected" && <ChatRoom /> } */}
      {/* {status === "connected" ? (
        <h1>Hello World.</h1>
      ) : (
        <header className={classes.chatHeader}>
     
          <Header />

       
          <Status />
        </header>
      )} */}
      <MobileChatDisplay />
    </div>
  );
}
