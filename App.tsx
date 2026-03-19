import React, { useState, useEffect } from "react";
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'

import RootNavigator from "./Navigation/RootNavigator" 
//import DirectMessage from "./Screens/DirectMessage";
 
import { SocketProvider } from "./socket/SocketContext"
import { socket } from "./socket/socket";

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    //if (loading) return null;

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const onConnect = () => {
      console.log("CONNECTED", socket.id);
    };

    const onDisconnect = (reason: string) => {
      console.log("DISCONNECTED", reason);
    };

    const onConnectError = (err: Error) => {
      console.log("CONNECT ERROR", err.message);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
    };
  }, []);

  return (
    <SocketProvider>
      <View style={{ flex: 1 }}>
        <RootNavigator session={session} />
      </View>
    </SocketProvider>
  );
}

