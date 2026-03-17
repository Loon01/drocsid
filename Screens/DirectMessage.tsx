import React, {useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { socket } from "../socket/socket";
import { sendDirectMessage } from "../socket/dmEvents";

export default function DirectMessage({ route }) {
    const {con_id, sender_id } = route.params;

    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        if (!socket.connected) { socket.connect(); }

        socket.emit("conversation:join", con_id);

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

        setContent("");
    }

    return(
        <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Direct Messages</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>{item.sender_id}: </Text>
              {item.content}
            </Text>
          </View>
        )}
      />

      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Type a message"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      <Button title="Send" onPress={sendDirectMessage} />
    </View>
    );
}