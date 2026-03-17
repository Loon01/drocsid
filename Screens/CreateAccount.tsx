import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { supabase } from '../lib/supabase'
export default function CreateAccount ({navigation}) {
    // variables User Input
    const [username, setUsername] = useState("");    
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    
    // message for user validation
    const [loading, setLoading] = useState(false)
    const [nessage, setMessage] = useState('')

    async function handleSignUp() {
      console.log("SignUp btn pressed")
      setLoading(true)
      setMessage('')

      const {data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        })
        await supabase.auth.signOut()

        if (authError) {
          console.error('AUTH ERROR: ', authError.message)
          setMessage('ERROR: account creation failed')
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
            console.error('DB ERROR: ', dbError.message)
          } else {
            console.log('User Created!')
            setMessage('Account Created! :)')
          }

          setLoading(false)

    };

     const handleNavigation = () => {
      navigation.replace("LogIn");
    } 

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            {/*USERNAME*/}
            <TextInput 
                style = {styles.input}
                placeholder = 'Username'
                value = {username}
                onChangeText = {setUsername}
            />
            {/*EMAIL*/}
            <TextInput
                style = {styles.input}
                placeholder = 'Email'
                value = {email}
                onChangeText = {setEmail}
            />
            {/*PASSWORD*/}
            <TextInput
                style = {styles.input}
                placeholder = 'Password'
                value = {password}
                onChangeText = {setPassword}
            />
            {/*SUBMIT BUTTON - just outputs to console rn*/}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}> 
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            {/*GO TO LogIn BUTTON*/}
            <Text>Have an account? </Text>
            <TouchableOpacity> 
                <Text style={styles.buttonLink} onPress={handleNavigation}>LogIn</Text>
            </TouchableOpacity>
            
        </View>
    );
}

// Style Stuff
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

  buttonLink: {
    color: "#0000FF" 
  }
  
});