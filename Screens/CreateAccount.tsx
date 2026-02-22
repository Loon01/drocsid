import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function CreateAccount () {
    // variables User Input
    const [username, setUsername] = useState("");    
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    
    const handleSignUp = (): void => {
      console.log("Username: ", username);
      console.log("Email: ", email);
      console.log("Password: ", password);
    };

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
  } 

  
});