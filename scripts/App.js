import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text, Pressable, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)

    const { data: authData, error: authError } =
      await supabase.auth.signUp({ 
        email,    //checks to see email is not malformed
        password, //checks to see if the password meets rules length
      })

    if (authError) {
      console.error('AUTH ERROR:', authError.message)
      setLoading(false)
      return
    }
  
    const userId = authData.user.id

    const { error: dbError } = await supabase
      .from('User')
      .insert({
        username,
        email,
        password,
        auth_id: userId,
      })

    if (dbError) {
      console.error('DB ERROR:', dbError.message)
    } else {
      console.log('User created!')
    }

    setLoading(false)
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Pressable
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating...' : 'Sign Up'}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#1e90ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
})
