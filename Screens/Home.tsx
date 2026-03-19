import { StyleSheet, View, Text, TouchableOpacity, Alert, Pressable } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { supabase } from '../lib/supabase'
import { useEffect, useState } from "react"

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    getProfile() 
  }, [])

  async function getProfile() {
    try {
      setLoading(true)

      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError) throw userError
      if (!user) throw new Error('No logged in user')

      const {data, error} = await supabase
        .from('User')
        .select(`username`)
        .eq('auth_id', user.id)     // compares uuid
        .single()

      console.log("DATA:", data)    //Check if the right data is being shown
      console.log("ERROR:", error)  //Check if there are errors

      if (error) throw error
      if (!data) throw new Error('User not found')

      setUsername(data.username)
      //setEmail(user.email ?? '')

    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  
    return (
      
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{username}</Text>
                        
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
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
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