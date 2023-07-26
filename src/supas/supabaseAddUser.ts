import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)


export async function supabaseAddUser(name:string)  {

  let { data: userExist, error } = await supabase
  .from('Spacebo Scores')
  .select('*')
  .eq('player_name', name)

  if (!error) {
    console.log(userExist)
    if (userExist?.length === 0) {
    // console.log(userExist, 'user does not exist, will try to add new user')
    // When user does not exist, user will be added to database, with 0 score.
      const { data, error } = await supabase
      .from('Spacebo Scores')
      .insert([
        { player_name: name, highest_score: 0 },
      ])
      .select()
      if (!error) {
        console.log(data, `${name} was added to database`)
      }
    }
    // when user already exists, update last_visited_at.
    else {
      const { data, error } = await supabase
      .from('Spacebo Scores')
      .update({ last_visited_at:'now()' })
      .eq('player_name', name)
      .select()

      if(!error) {
        console.log(data, 'updataed')
      }
    }
  }


}