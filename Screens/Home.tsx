import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from "react"

export default function Home({navigation}, {session}: {session: Session}) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    if (session)
      getProfile() 
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      if (!session?.user) 
        throw new Error('No user on the session!')

      const {data, error} = await supabase
        .from('User')
        .select(`username`)
        .eq('auth_id', session?.user.id) // compares uuid
        .single()

      console.log("DATA:", data)
      console.log("ERROR:", error)
      if (error)
        throw error
      if (data)
        setUsername(data.username)
    } catch (error) {
      if (error instanceof Error)
        Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  
    return (
      
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{session?.user?.email}</Text>
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
});