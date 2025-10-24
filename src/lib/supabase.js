import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funciones de autenticación
export const auth = {
  async signUp(email, password, username) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    })
    return { data, error }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Funciones de personajes
export const characters = {
  async saveCharacter(characterData, imageUrl) {
    const user = await auth.getCurrentUser()
    if (!user) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('characters')
      .insert({
        user_id: user.id,
        character_data: characterData,
        image_url: imageUrl,
        created_at: new Date().toISOString()
      })
      .select()

    return { data, error }
  },

  async getCharacters() {
    const user = await auth.getCurrentUser()
    if (!user) return { data: [], error: 'Usuario no autenticado' }

    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  async deleteCharacter(characterId) {
    const user = await auth.getCurrentUser()
    if (!user) return { error: 'Usuario no autenticado' }

    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', characterId)
      .eq('user_id', user.id)

    return { error }
  }
}