import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, signout } from "../lib/auth";




const AuthContext=createContext(null)
export function AuthProvider({children}){
    const [user,setuser]=useState(null)
    const[profile,setprofile]=useState(null)
    const[isLoading,setisLoading]=useState(true)



    useEffect(()=>{
        const cleanup=onAuthChange(async(user)=>{
            setuser(user);
            if(user){
                try {
                    const userprofile=await getUserProfile(user.id);
                    console.log("fiiri waryaa",userprofile)
                    setprofile(userprofile)
                } catch (error) {
                    console.error("error feching user profile,",error)
                }
            }else{
                setprofile(null)
        
            }
            setisLoading(false)
        })
        return cleanup
            },[])
        
        
        
            const logout = async () => {
                try {
                    await signout()
                } catch (error) {
                    console.error('Error signing out:', error)
                }
            }
        
        const value={
            user,
            profile,
            isLoading,
            isLoggedIn: !!user,
            isadmin:profile?.username === "adnangeo266",
            logout
        }
        
            return(
                <AuthContext.Provider value={value}>
                        {children}
                </AuthContext.Provider>
            )


}


export function useAuth(){

    const context =useContext(AuthContext)
    if(context === null){
        throw new Error("useAuth must be used whin and Authprofider")
    }
    return context;
    
    
    }