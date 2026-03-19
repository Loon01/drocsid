import React, {useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { socket } from "../socket/socket";
import { sendDirectMessage } from "../socket/dmEvents";
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function DirectMessage({ route }) {
    // This is the way to get a specific conversation but I need to use test so I will comment this out for now
    //const {con_id, sender_id } = route.params;

    const con_id = "75625d52-d696-4e2e-9045-1e304d94312d";
    const sender_id = "7";

    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        if (!socket.connected) { socket.connect(); }

        //socket.emit("conversation:join", con_id);

        const handleNewDM = (message) => {
            if (message.con_id === con_id) {
                setMessages((prev) => [...prev, message]);
            }
        };

        const handelDMError = (errorMessage) => {
            console.log("DM error:", errorMessage);
        };

        socket.on("dm:new", handleNewDM);
        socket.on("dm:error", handelDMError);

        return () => {
            socket.off("dm:new", handleNewDM);
            socket.off("dm:error", handelDMError);
        };
    }, [con_id]);

    const sendMessage = () => {
        const trimmed = content.trim();
        if (!trimmed) return;
        sendDirectMessage(con_id, sender_id, trimmed);
        //console.log(trimmed)
        setContent("");
    }

    return(
        <SafeAreaProvider style={styles.container}>
            <KeyboardAvoidingView style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}> 
                {/* CONVERSATION FIELD */}
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.messageRow}>
                            <Text>
                                <Text style={styles.sender}>{item.sender_id}: </Text>
                                {item.content}
                            </Text>
                        </View>
                    )}
                />

                {/* INPUT FIELD */}
                <TextInput
                    value={content}
                    onChangeText={setContent}
                    placeholder="Type a message"
                    style={styles.input}
                    returnKeyType="send"
                    onSubmitEditing={sendMessage}
                />
                {/*<Button title="Send" onPress={sendMessage} />*/}
            </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 40
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  messageRow: {
    marginBottom: 10,
  },
  sender: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});