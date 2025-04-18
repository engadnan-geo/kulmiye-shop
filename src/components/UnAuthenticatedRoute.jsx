import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"



export default function UnAuthenticatedRoute({children ,redirectTo="/"}){
    const {isLoading,isloggedin}=useAuth()
    if(isLoading){
return(
    <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
</div>
)
    }

if(isloggedin){
    return<Navigate to={redirectTo} replace />
}
return children

}

