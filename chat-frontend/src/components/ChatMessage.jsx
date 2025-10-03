function ChatMessage({message}){
    console.log(message);
    // let content = message;
    // const parsed = typeof message === "string" ? JSON.parse(message) : message;
    // if(parsed & typeof parsed === "object" && parsed.content) {
    //     content = parsed.content;
    // }
    // const content = typeof message === "string" ? message : message.content;
    
    return(
        <>
            <span>{message}</span>
        </>
    )
}

export default ChatMessage;