import { StyleSheet, Text, Pressable } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { supabase } from '../lib/supabase'

export default function Profile() {
    return(
        <SafeAreaProvider>
        <Text>;-;</Text>

           <Pressable
                style={styles.button}
                onPress={() => supabase.auth.signOut()}
                >
                  <Text style={styles.buttonText}>
                    Sign out
                  </Text>
                </Pressable>
    </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },  
});