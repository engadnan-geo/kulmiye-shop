import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiUser3Fill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const {isLoggedIn,profile,logout }=useAuth()
    const [isMenuOpen, setisMenuOpen]=useState(false)
    const [isDropdownOpen,setisDropdownOpen]=useState(false)
  return (
    <div className='fixed top-0   left-0  right-0    bg-blue-500 bg-opacity-60 backdrop-blur-md shadow z-10  '>
       <div className='max-w-4xl mx-auto p-4'>
        {/* links ka or menus */}
        <nav className='flex justify-between items-center '>
<div>
    <Link to="/#" className='text-gray-700 font-bold text-xl text-white text-white'>Kulmiye Shope</Link>
</div>
<ul className='hidden sm:ml-6 sm:flex sm:space-x-8'>
           <Link to="/home">Home</Link>
           <Link to="/product"> Products</Link>
           <Link to="/about">About</Link>
           <Link to="/contect">Contects</Link>
          
           </ul> 
              <div className='relative'>
              <Link to="/carts"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
</svg>
<span className='absolute -top-2 -right-2  bg-red-700 w-5 h-5 rounded-full  flex justify-center items-center text-white '>0</span>
</Link>
              </div>

            {
                isLoggedIn ? (<div className=' hidden sm:flex space-x-2'>
                <div >
                    <span>{profile?.username}</span>
                   
                </div>

               <div className='relative'>
                <button className='flex items-center justify-center rounded-full  h-8 w-8 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
        onMouseEnter={()=>setisDropdownOpen(true)}
            onclick={()=>setisDropdownOpen(!isDropdownOpen)}>
                
 <img src="https://images.unsplash.com/photo-1742201876722-85a042294575?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-8 h-8 rounded-full' /> 
                </button>
                {
                isDropdownOpen &&(
                    <div className='bg-white absolute right-0 w-48 mt-1 rounded-md shadow-lg z-10  ' onMouseLeave={()=>setisDropdownOpen(false)}>
                        <div className='flex flex-col justify-center items-center p-4'>
                        <Link to="/profile"  >your profile</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <button
                   onClick={() => logout()}
                 className='block px-4 py-2 text-sm text-gray700 hover:bg-blue-500  hover:text-white'>Signout</button>
                        </div>
                    </div>
                )
               }
               </div>

               
                </div>

                ):(
                    <>
                    <div className='hidden md:flex space-x-3'>
                        <Link to="/signin" className='bg-gray-100 rounded-sm px-4 py-2 border text-xl text-blue-600'>SingIn</Link>
                        <Link to="/signup" className='bg-red-800 rounded-sm px-4 py-2 border-blue-400 text-xl text-white'>SingUp</Link>
                    </div>
                    </>

                )
            }




{/* mopile menu  humburger*/}
<div className='flex items-center  -mr-2 sm:hidden'>
    <button className='inline-flex items-center justify-center p-2 rounded-md text-gray-100' onClick={()=>setisMenuOpen(!isMenuOpen)}>
        {isMenuOpen?<IoMdClose className='block w-6 h-6 ' />: <RiMenu3Fill />}
    
    
    </button>
</div>

        </nav>
        </div> 



           

       
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {  isLoggedIn &&(
               
                <div className='flex justify-center items-center space-x-2'>
                    <div >
                    <span>hellow</span>
                   
                </div>

               
                <button className='flex items-center justify-center rounded-full  h-8 w-8 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'>
       
                
 <img src="https://images.unsplash.com/photo-1742201876722-85a042294575?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-10 h-10 rounded-full' /> 
                </button>
                </div>
                
            )}
            <Link to="/home" className="block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-base font-medium text-orange-700 bg-orange-50">
              Home
            </Link>
            <Link to="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              About
            </Link>
            <Link to="/product" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Products
            </Link>
            <Link to="/contect" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Contects</Link>
            


            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                Dashboard
                </Link>
                
                <Link to="/profile" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  Profile
                </Link>
                <button
                
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/signin" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  Sign In
                </Link>
                <Link to="/signup" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Header