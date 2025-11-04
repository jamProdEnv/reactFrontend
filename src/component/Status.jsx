import { useSocket } from "../context/SocketIOContext";

export function Status() {
  const { status, error } = useSocket();
  return (
    <div>
      Socket Status: <b>{status} </b>
      {error && <i>- {error.message}</i>}
    </div>
  );
}
