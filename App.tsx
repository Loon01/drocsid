import RootNavigator from "./Navigation/RootNavigator" 
 
import { SocketProvider } from "./socket/SocketContext"
import { socket } from "./socket/socket";

socket.on("connect", () => {
  console.log("CONNECTED", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("DISCONNECTED", reason);
});

socket.on("connect_error", (err) => {
  console.log("CONNECT ERROR", err.message);
});

export default function App() {
  return (
    <SocketProvider>
      <RootNavigator/>
    </SocketProvider>
  );
}

