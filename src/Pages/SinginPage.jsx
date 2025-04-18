import React, { useState } from 'react'
import { signIn } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

const SinginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
const navigate=useNavigate()

const handlesubmit =  async(e)=>{
    e.preventDefault()
    setIsLoading(true)
  setError(null)
  try {
    await signIn(email,password)
navigate("/")
  } catch(error){
    setError(error.message || "failed to sign in .please check your credentials." )
    
console.error("hi thayis error for submit log in")
  }finally{
    setIsLoading(false)
  }
}

  return (
    <div className='min-h-screen p-4 bg-white  flex justify-between items-center'>
        <div className='bg-gray-50  p-4 sm:p-6 lg:p-8 rounded-md shadow-md max-w-md w-full lg:mx-auto'>

            <div className='flex justify-between items-center flex-col'>
                 <h1 className='text-xl font-bold text-gray-800'>Wellcome Admin</h1>
                 <span className='text-red-500  text-base'>Please SingIn</span>
                 
             </div>
            {/* error */}
            
            {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
            
            <form  onSubmit={handlesubmit}>
                <div className='flex flex-col space-y-2'>
                <label htmlFor="" className='text-gray-700 font-bold text-xl'>Email
                <input type="email" name="" id=""  className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                '
                placeholder="@gmail.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                </label>
                <label htmlFor=""  className='text-gray-700 font-bold text-xl'>
                    Password
                    <input type="password" name="" id="" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                     placeholder='*******'
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     />
                </label>
                </div>

                <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>


            </form>

        </div>
        
    </div>
  )
}

export default SinginPage