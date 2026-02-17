import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text, Pressable, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'

export default function CreateAccount() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')


  async function handleSignup() {
    setLoading(true)
    setMessage('')

    const { data: authData, error: authError } =
      await supabase.auth.signUp({ 
        email,    //checks to see email is not malformed
        password, //checks to see if the password meets rules length
      })

    if (authError) {
      console.error('AUTH ERROR:', authError.message)
      setMessage('ERROR IN CREATING ACCOUNT :(')
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
      //setMessage('Could not create Account :(')
    } else {
      console.log('User created!')
      setMessage('Account Created! :)')
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
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


      <Pressable
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating...' : 'Sign Up'}
        </Text>
      </Pressable>

      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : null}

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

  message: {
  marginTop: 20,
  textAlign: 'center',
  //color: 'green',
  fontWeight: 'bold',
  //color: message.includes('ERROR') ? 'red' : 'green'
  },
})
