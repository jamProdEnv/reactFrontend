import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketIOContext";
import { userContext } from "../context/UserContext";

export function useChat() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const { username } = userContext();
  const [currentRoom, setCurrentRoom] = useState("public");

  function receiveMessage(message) {
    console.log("Message", message);
    // const room = [recipient, username].sort().join("_");
    setMessages((messages) => [...messages, message]);
  }

  useEffect(() => {
    if (!socket) return;

    socket.off("chat.message", receiveMessage);
    socket.on("chat.message", receiveMessage);

    return () => socket.off("chat.message", receiveMessage);
  }, [socket]);

  function clearMessages() {
    setMessages([]);
  }

  function switchRoom(room) {
    setCurrentRoom(room);
  }

  function joinRoom(room) {
    socket.emit("chat.join", room);
    setCurrentRoom(room);
    //  Join Room Calls switchRoom
    switchRoom(room);
  }

  async function getRooms() {
    const userInfo = await socket.emitWithAck("user.info", socket.id);
    const rooms = userInfo.rooms.filter((room) => room !== socket.id);
    return rooms;
  }

  async function sendMessage(message, recipient = null) {
    if (!socket) return; // wait until socket is initialized

    if (message.startsWith("/")) {
      const [command, ...args] = message.substring(1).split(" ");
      switch (command) {
        case "clear":
          clearMessages();
          break;
        case "rooms":
          const rooms = await getRooms();
          receiveMessage({
            message: `You are in: ${rooms.join(".")}`,
          });
          break;
        case "join": {
          if (args.length === 0) {
            return receiveMessage({
              message: "Please provide a room name: /join room",
            });
          }
          const room = args[0];
          const rooms = await getRooms();
          if (rooms.includes(room)) {
            return receiveMessage({
              message: `You are already in room "${room}".`,
            });
          }
          joinRoom(room);
          break;
        }
        case "switch": {
          if (args.length === 0) {
            return receiveMessage({
              message: "Please provide a room name: /switch <room>",
            });
          }
          const room = args[0];
          const rooms = await getRooms();
          if (!rooms.includes(room)) {
            return receiveMessage({
              message: `You are not in room "${room}". Type "/join ${room}" to join it first.`,
            });
          }
          switchRoom(room);
          receiveMessage({
            message: `Switched to room "${room}".`,
          });

          break;
        }
        default:
          receiveMessage({
            message: `Unknown command: ${command}`,
          });
          break;
      }
    } else {
      socket.emit("chat.message", currentRoom, message);
      // } else {
      //   socket.emit("private.message", recipient, room, message);
      //   receiveMessage({
      //     message: `Private Message: ${username} said "${message}."`,
      //   });
      // }
    }
  }
  return { messages, sendMessage, joinRoom, currentRoom, setCurrentRoom };
}
