import { useSocket } from "../context/SocketIOContext";

function Status(){
    const {status, error } = useSocket();
    return(
        <>
            Socket Status: <b>{ status }</b>
            {error && <i> - { error.message }</i>}
        </>
    )
}

export default Status;