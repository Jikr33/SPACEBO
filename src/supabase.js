import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kzylnwqboabfxifjsevi.supabase.co'
const supabaseKey = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";

const supabase = createClient(supabaseUrl, supabaseKey)


export async function supabaseAll()  {

let { data: scores, error } = await supabase
  .from('Spacebo Scores')
  .select('*')

  if (!error) {
    console.log(scores)
    return scores
  }

}