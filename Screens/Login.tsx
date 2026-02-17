import React, {useState} from 'react';
import {Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, AppState} from 'react-native';
import { supabase } from '../lib/supabase'
import CreateAccount from './CreateAccount'; //was used for testing but probably not the right way of doing it

AppState.addEventListener('change', (state) => {
  if (state == 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function LogIn({ gotoSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function signInWithUsername() {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      console.log("LOGIN RESULT:", data)
      console.log("LOGIN ERROR:", error)

      if (error) {
        Alert.alert(error.message)
        setMessage("ERROR IN LOGGING IN")
      }
      setLoading(false)
    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Log In</Text>
 
                {/*USERNAME OR EMAIL*/}
                <TextInput 
                    style={styles.input} 
                    placeholder='email@email.com'
                    value={email}
                    onChangeText={setEmail}
                />

                {/*PASSWORD*/}
                <TextInput 
                    style={styles.input} 
                    placeholder='password'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                
                {/*SUBMIT BUTTON - just outputs to console rn*/}
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => signInWithUsername()}
                    disabled={loading}
                    >
                    <Text style={styles.buttonText}>
                      {loading ? 'Logging In...' : 'Log In'}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={gotoSignup} //need to have it navigate to the create acctount screen
                    disabled={loading}
                    >
                    <Text style={styles.buttonText}>
                      Sign Up
                    </Text>
                </TouchableOpacity>
                
                {message ? (
                  <Text style={styles.message}>{message}</Text>
                ) : null}

            </View>
        </KeyboardAvoidingView>
    );
}

// Style Stuff 
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
  fontWeight: 'bold',
  },
});
