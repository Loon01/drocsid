import CreateAccount from './Screens/CreateAccount';  
//import Login from './Screens/Login';
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Login from './Screens/Login'
import Account from './Screens/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
  
  const [session, setSession] = useState<Session | null>(null)
  const [screen, setScreen] = useState<'login' | 'signup'>('login')
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : screen === 'login' ? (
        <Login gotoSignup={() => setScreen('signup')} />
      ) : (
        <CreateAccount gotoLogin={() => setScreen('login')} />
      )}
    </View>
  )
}