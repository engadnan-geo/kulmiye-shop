import React from 'react'

const Footer = () => {
  const  currentyear= new Date().getFullYear()
  return (
    <div className='py-8 mt-16 border-t-4 border-blue-300  '>
    <div className='max-w-4xl mx-auto text-center'>
        <p className='text-gray-500 font-light mb-2'>thanks for visitting this website</p>
        <p className='text-gray-700 font-semibold'>mr Adnan &copy: {currentyear}</p>
    </div>
</div>
  )
}

export default Footer