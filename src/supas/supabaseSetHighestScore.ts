import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function supabaseSetHighestScore(name:string, score:number)  {
    const { data, error } = await supabase
      .from('Spacebo Scores')
      .update({ highest_score: score })
      .eq('player_name', name)
      .select()

  if (!error) {
    console.log(data)
    
  }


}