import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='fixed top-0   left-0  right-0    bg-blue-500 bg-opacity-60 backdrop-blur-md shadow z-10  '>
       <div className='max-w-4xl mx-auto p-4'>
        {/* links ka or menus */}
        <nav className='flex justify-between items-center '>
<div>
    <Link to="/#" className='text-gray-700 font-bold text-xl '>Kulmiye Shope</Link>
</div>
<ul className='space-x-4 text-gray-300  flex'>
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

        </nav>
        </div> 
    </div>
  )
}

export default Header