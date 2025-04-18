import supabase from "./supabase";



export async function singup(email,password,username=""){
 
    // create auth user 
    let {data,error}=await supabase.auth.signUp({email,password})
    if (error){
        console.log("singup error",error)
        throw error

    }

    console.log("auth singup is succesfull",data)
    if (data?.user){
        const{data:sessiondata}=await supabase.auth.getSession()

        if(!sessiondata ?.session){
            console.log("no active session yet profile will create  on first sing")
            return data
        }

        const displayname=username || email.split("@")[0]


        // create profile 
        const {data:profiledata,error:profileErorr}=await supabase
        .from("user")
        .insert({
            id:data.user.id,
            username:displayname,
            avatar_url:null
        })
        .select()
        .single()

        if(profileErorr){
            console.log("profile eror",profileErorr)
        }else{
            console.log("profile created",profiledata)
        }
        return singup()
    }


}


export async function signIn(email, password){
let {data,error}=await supabase.auth.signInWithPassword({
    email:email,
    password:password
})
console.log("user data",data)
if(error) throw error
if(data?.user){
    try {
        const profile = await getUserProfile(data.user.id);
        console.log("profile info ", profile)
    } catch (profileError){
        console.error('Error with profile during signin:', profileError)
    }
}

}


export async function getUserProfile(userId){
    const {data:sessionData}=await supabase.auth.getSession()
    const {data,error}=await supabase.from("user")
    .select("*")
    .eq("id",userId)
    .single()
    if (error && error.code === "PGRST116"){
        console.log('No profile found, attempting to create one for user:', userId)
        // GET USER EMAIL TO DRIVER USR NAME IF NEEDED


const{data:userData}=await supabase.auth.getUser();

console.log("true data", userData)

const email = userData?.user.email;
const defaultUsername = email ? email.split("@")[0] : `user_${Date.now()}`;

const {data:newprofile,error:profileError}=await supabase
.from('user')
.insert({
id:userId,
username:defaultUsername,
avatar_url:null
})
  
.select()
.single()
if(profileError){
    console.error("profile error ",profileError)
    throw error
}else{
    console.log("profile created successfully",newprofile)
}
return newprofile
    }

    // general error
    if(error){
        console.error("error fetchin profile",error)
        throw error
    }

console.log("exiting profile")
return data
}


export function onAuthChange(callback){
    const {data}=supabase.auth.onAuthStateChange((event,session)=>{
      callback(session?.user || null,event)
    })
    return()=>data.subscription.unsubscribe()
  }
  


  export async function signout(){
    await supabase.auth.signOut()
  }
  