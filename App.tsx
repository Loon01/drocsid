import React, { useEffect } from "react";
import RootNavigator from "./Navigation/RootNavigator" 

import DirectMessage from "./Screens/DirectMessage";
 
import { SocketProvider } from "./socket/SocketContext"
import { socket } from "./socket/socket";

export default function App() {
  useEffect(() => {
    const onConnect = () => {
      console.log("CONNECTED", socket.id);
    };

    const onDisconnect = (reason: string) => {
      console.log("DISCONNECTED", reason);
    };

    const onConnectError = (err: Error) => {
      console.log("CONNECT ERROR", err.message);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
    };
  }, []);

  return (
    <SocketProvider>
      <DirectMessage />
    </SocketProvider>
  );
}

