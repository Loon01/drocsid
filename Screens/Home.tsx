import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function Home({navigation}) {    
    return (
      
        <SafeAreaProvider style={styles.container}>

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText} 
                    onPress={() => navigation.navigate("DirectMessage")}>DMs</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}
                    onPress={() => navigation.navigate("Profile")}>Profile</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 40
  },
  serverText: {
    fontSize: 20,
  },
  navBar: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    fontWeight: "600",
  },
});