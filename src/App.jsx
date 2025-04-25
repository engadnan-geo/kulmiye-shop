
import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Toaster position="top-right"  reverseOrder={false}/>
    <AuthProvider>
    <div className="max-w-4xl mx-auto pt-16"> 
<Header/>
<Outlet/>


< Footer/>




    </div>
    </AuthProvider>
    </>
  )
}

export default App
