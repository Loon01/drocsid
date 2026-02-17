import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text, Pressable, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'

export default function CreateAccount() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)

    const { data: authData, error: authError } =
      await supabase.auth.signUp({ 
        email,    //checks to see email is not malformed
        password, //checks to see if the password meets rules length
      })

    if (authError) {
      console.error('AUTH ERROR:', authError.message)
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
      console.error('DB ERROR:', dbError.message)
    } else {
      console.log('User created!')
    }

    setLoading(false)
  }