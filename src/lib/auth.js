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