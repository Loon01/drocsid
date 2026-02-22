import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateAccount from "./Screens/CreateAccount"; // ignore casing problem if it shows up
import LogIn from "./Screens/LogIn"; // ignore casing problem if it shows up

export default function App() {
  return (
    //<CreateAccount/>
    <LogIn/>
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
