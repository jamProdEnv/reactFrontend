import React from 'react';
import ChatRoom from './components/ChatRoom'
import { SocketIOContextProvider, useSocket } from './context/SocketIOContext';
import Status from './components/Status';

function App() {
  const { sttaus } = useSocket();
  return (
    <>
    
    <SocketIOContextProvider>
      <Status />
      <ChatRoom />
    </SocketIOContextProvider>
    </>
  )
}

export default App
