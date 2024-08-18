import { createClient } from '@supabase/supabase-js'



const supabaseUrl = '';
const supabaseKey = '';


export const supabase = createClient(supabaseUrl, supabaseKey)

export const signInUser = async ({username, password}) => await supabase.auth.signInWithPassword({
  email: username,
  password: password,
})

export const signOutUser = async () => await supabase.auth.signOut()

export const addFunds = async (fund) => await supabase
  .from('add_funds')
  .insert(fund)
  .select()

export const getFundsByUserId = async (userId) => await supabase
  .from('add_funds')
  .select('*')
  .eq('user_id', userId);


export const saveCurrentState = async (state) => await supabase
  .from('saveat')
  .insert(state)
  .select();


export const getCurrencyByUserId = async (userId) => await supabase
  .from('saveat')
  .select('*')
  .eq('user_id', userId);

  

export const signUpUser = async ({username, password}) =>
await supabase.auth.signUp({
    email: username,
    password: password
  })
  

export const checkIfEmailExists = async (email) => {
  const {data, error} = await supabase
  .from('users')
  .select('email')
  .eq('email, email');

  if (error) {
    console.error(error);
    return false;
  }

  return Date.length > 0;
}  