import React, { useState } from 'react'

const SinginPage = () => {
const [error,seterorr]=useState("")
const [isLoading,setisLoading]=useState("")




  return (
    <div className='min-h-screen p-4 bg-white  flex justify-between items-center'>
        <div className='bg-gray-50  p-4 sm:p-6 lg:p-8 rounded-md shadow-md max-w-md w-full lg:mx-auto'>

            <div className='flex justify-between items-center flex-col'>
                 <h1 className='text-xl font-bold text-gray-800'>Wellcome Admin</h1>
                 <span className='text-red-500  text-base'>Please SingIn</span>
                 
             </div>
            {/* error */}
            <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm'>
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ex deleniti hic repellendus sed modi soluta nesciunt optio in id cum iusto delectus, voluptatem aut enim sint nulla quasi illum?
            </div>
            <form >
                <div className='flex flex-col space-y-2'>
                <label htmlFor="" className='text-gray-700 font-bold text-xl'>Email
                <input type="email" name="" id=""  className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                '
                placeholder="@gmail.com"
                />
                </label>
                <label htmlFor=""  className='text-gray-700 font-bold text-xl'>
                    Password
                    <input type="password" name="" id="" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                     placeholder='*******'
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