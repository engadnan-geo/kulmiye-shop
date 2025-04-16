import { createClient } from "@supabase/supabase-js";


const superbaseUrl=import.meta.env.VITE_SUPERBASE_URL
const supabaseAnonKey=import.meta.env.VITE_SUPERBASE_ANON_KEY

const supabase=createClient(superbaseUrl,supabaseAnonKey,{
    auth:{
    persistSession:true,
    autoRefreshToken:true
    },
    realtime:{
           prams:{
            eventspersecond:10
           }
    }
    })
    
    export default supabase