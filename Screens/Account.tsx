import { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Alert, Text, Pressable, TextInput } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      if (!session?.user) throw new Error('No user on the session!')

      const { data, error } = await supabase
        .from('User')
        .select(`username`)
        .eq('auth_id', session?.user.id) //compares uuid
        .single()

      console.log("DATA:", data)
      console.log("ERROR:", error)
      if (error) throw error
      if (data) setUsername(data.username)

    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      
      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{session?.user?.email}</Text>

      
      <Text style={styles.label}>Username</Text>
      <Text style={styles.value}>{username}</Text>
      
      <Pressable 
      style={styles.button}
      onPress={() => supabase.auth.signOut()}
      disabled={loading} 
      >
        <Text style={styles.buttonText}>
          Sign out
        </Text>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: 'center'
  },
  
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
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

  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  value: {
    fontSize: 18,
    marginTop: 5,
  },  

})