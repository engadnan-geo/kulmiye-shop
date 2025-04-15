
import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="max-w-4xl mx-auto pt-16"> 
<Header/>
<Outlet/>


< Footer/>




    </div>
  )
}

export default App
