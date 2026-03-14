import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from "./Navigation/RootNavigator" 
import AppNavigator from "./Navigation/AppNavigator" 
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
