import { useState } from "react";

function EnterMessage({onSendMessage}){
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage({
            //  Sending This Object To useChat.sendMessages()
            content: message.trim()
        });
        setMessage("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="create-message">Enter Message</label>
            <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <input type="submit" value={"Send"} />
        </form>
    );
}

export default EnterMessage;