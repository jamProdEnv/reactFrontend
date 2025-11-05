import { ChatRoom } from "../component/ChatRoom";
import { Header } from "../component/Header";
import { Status } from "../component/Status";
import { useSocket } from "../context/SocketIOContext";

export function Chat() {
  const { status } = useSocket();

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <br />
      <Status />
      <br />
      <hr />
      <br />
      {status === "connected" && <ChatRoom />}
    </div>
  );
}
