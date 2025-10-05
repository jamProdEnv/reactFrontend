//  Receive a message

import { useState, useEffect } from "react"
import { useSocket } from "../context/SocketIOContext";

//  Send a message
export function useChat(){
    const { socket } = useSocket();
    const [messages, setMessages] = useState([]);

    function receiveMessages(message){
        //  Receives The Message Emitted From The Chat Server
        setMessages((messages) => [...messages, message ]);
    }

    useEffect(() => {
        if(!socket) return;
        function setUpListeners(){
        
        socket.on("chat.message", receiveMessages);
        socket.emit("client.ready");
        }

        if(socket.connected){
            setUpListeners();
        } else {
            socket.once("connect", setUpListeners);
        };

        return () => {
            socket.off("chat.message", receiveMessages);
            socket.off("connect", setUpListeners);
        }
       
    }, []);

    //  {content : "String"} from onSend in EnterMessage.jsx
    //  Message Schema message : {type: string}
    function sendMessage(message){
        // const msgObj = typeof msg === "string" ? {message : msg} : {message: msg.content};
        let msg;
        // socket.emit("chat.message", {message: msgObj});
   
         // optimistically update UI immediately
        // setMessages(prev => [...prev, msgObj]);
        // console.log("Message Sent: ", msgObj);
        if (typeof message === "object" && message !== null && "content" in message){
                msg = message.content;
        } else if (typeof message === "number" || typeof message === "string"){
            msg = message.toString();
        } else {
            msg = "";
        }
        socket.emit("chat.message", {message : msg});
        setMessages(prev => [...prev, msg]);
        console.log("Message Sent: ", msg);
    };
    return { messages, sendMessage }
    
}

