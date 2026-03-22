import { supabase } from "./supabase"

export async function getProfile() {
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError) throw userError
      if (!user) throw new Error('No logged in user')

      const {data, error} = await supabase
        .from('User')
        .select(`u_id, username, email`)
        .eq('auth_id', user.id)     // compares uuid
        .single()

      console.log("DATA:", data)    //Check if the right data is being shown
      console.log("ERROR:", error)  //Check if there are errors

      if (error) throw error
      if (!data) throw new Error('User not found')

      //setUsername(data.username)
      //setEmail(user.email ?? '')

    return {
        // Get current logged in User's info
        username: data.username,
        email: data.email,
        uid: data.u_id,
    }
  }
