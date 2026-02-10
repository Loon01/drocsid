import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text, Pressable, TextInput } from 'react-native'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
//import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    //getServer()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  /*
  async function getServer() {
    const { data, error } = await supabase.from('Server').select();
  
    console.log("DATA:", data);
    console.log("ERROR:", error);
  
    if (error) {
      console.error(error);
      return;
    }
  
    setServer(data);
  }
  */

  return (
    <View>
      {session && session.user ? <Account key = {session.user.id} session={session} /> : <Auth />}
    </View>
  )
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },  
});
*/
