import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export async function supabaseAll()  {

let { data: scores, error } = await supabase
  .from('Spacebo Scores')
  .select('*')

  if (!error) {
    console.log(scores)
    return scores.sort((a, b) => b.highest_score - a.highest_score).map((score, i) => ({
      ...score,
      // last_visited_at: score.last_visited_at.slice(0, 19) || '', // Spread the properties of the original object
      key: score.id,
      count: i+1 // Add the "key" property with the value of the "id" property
    }));
  }

}