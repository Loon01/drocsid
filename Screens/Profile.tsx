import { StyleSheet, Text, Pressable } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { supabase } from '../lib/supabase'
import { getProfile } from '../lib/user_info'
import { useEffect, useState } from "react"

export default function Profile() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [uid, setUid] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    const profile = await getProfile()
    setUid(profile.uid)               //Soon need to remove (Users don't need to see their own ID)
    setUsername(profile.username)
    setEmail(profile.email)
  }
    return(
        <SafeAreaProvider>

        {/*<Text>Nothing for now.....;-;</Text>*/}

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{username}</Text>
        
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>uid</Text>      {/* To be removed later */}
        <Text style={styles.value}>{uid}</Text>    {/* To be removed later */}

        {/*Some blank space so that the above text 
        does not touch sign out button*/}
        <Text style={styles.label}></Text>  

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
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },  
});