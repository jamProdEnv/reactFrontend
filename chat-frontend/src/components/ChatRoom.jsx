import { useChat } from "../hooks/useChat";
import ChatMessage from "./ChatMessage";
import EnterMessage from "./EnterMessage";

function ChatRoom(){
    const {messages, sendMessage} = useChat();

    return(
        <div>
            <h3>Chat Room</h3>
            <div>
                <h3>Public Chat</h3>
                <div style={{border: "1px solid gray", padding: "16px", marginBottom: "20px"}}>
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message ={msg} />
                    ))}
                </div>
                <EnterMessage onSendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default ChatRoom;