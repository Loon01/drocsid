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
    supabase.auth.getSession().then(({ data: { session } }) => {    //checks to see if someone is already logged in and saves session
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {          //listens for login/logout events
      setSession(session)
    })
  }, [])
  
  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? (                                  //if session exists, show account screen
        <Account key={session.user.id} session={session} />
      ) : screen === 'login' ? (                                    //if not logged in and screen = login, show login page
        <Login onSignupPress={() => setScreen('signup')} />         //if user presses signup on the login screen, switch to signup
      ) : (                                                         //if screen = signup, show create account page
        <CreateAccount onLoginPress={() => setScreen('login')} />   //if user presses login on the signup screen, switch back to login
      )}
    </View>
  )
}