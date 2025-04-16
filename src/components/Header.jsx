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
              <div>
              <Link to="/cart"></Link>
              </div>

        </nav>
        </div> 
    </div>
  )
}

export default Header