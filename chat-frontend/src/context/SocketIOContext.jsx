//  Context 
//  Context Holder
//  Context Filter
//  Context Interceptor 
import { useContext, useEffect, createContext, useState } from "react";
import { io } from "socket.io-client";


//  Context
const SocketIOContext= createContext({
    socket: null,
    status: "waiting",
    error: null
});

export const SocketIOContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [status, setStatus] = useState("waiting");
    const [error, setError] = useState(null);

    useEffect(() => {
        const socket = io("http://100.27.195.62:3000", {
            // const socket = io("localhost:3000", {
            query: window.location.search.substring(1),
        });

        socket.on("connect", () => {
            setStatus("connected");
            setError(null);
        });

        socket.on("error", (error) => {
            setStatus("error");
            setError(error);
        });

        socket.on("disconnect", () => setStatus("disconnect"));
        setSocket(socket);
    }, [setSocket, setStatus, setError]);

    return (
    <SocketIOContext.Provider value={ {socket, status, error} }>
        { children }
    </SocketIOContext.Provider>
    );
}

export function useSocket () {
    return useContext(SocketIOContext);
}




