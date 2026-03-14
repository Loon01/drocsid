import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

export default function LogIn ({navigation}) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogIn = () => {
      
    }

    const handleNavigation = () => {
      navigation.replace("CreateAccount")
    }
    
    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Log In</Text>
 
                {/*USERNAME OR EMAIL*/}
                <TextInput style={styles.input} placeholder='username or email'
                    value={identifier}
                    onChangeText={setIdentifier}
                />

                {/*PASSWORD*/}
                <TextInput style={styles.input} placeholder='password'
                    value={password}
                    onChangeText={setPassword}
                />
                
                {/*SUBMIT BUTTON - just outputs to console rn*/}
                <TouchableOpacity style={styles.button} onPress={handleLogIn}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <Text>Don't have an account?</Text>
                <TouchableOpacity>
                  <Text style={styles.buttonLink} onPress={handleNavigation}>Create Account</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
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