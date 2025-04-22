import React from 'react'
import { FiHome, FiPieChart, FiUser } from 'react-icons/fi'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='min-h-screenb mt-3'>
<div className='flex  p-8  space-x-2'>

    {/* site */}
<div className='hidden md:block bg-blue-500 w-1/4 rounded shadow-md p-3'>

        <div className="p-6 text-xl font-bold text-white">MyDashboard</div>
        <nav className="flex flex-col space-y-4">
        <Link to="/dashboard/additems" className='font-semibold text-xl  bg-white p-1 rounded-full text-black text-center'>AddItems</Link>
        <Link to="/dashboard/manageitems" className='font-semibold text-xl bg-white p-1 rounded-full text-black text-center'>ManageItems</Link>
        <Link  to="/dashboard/income"  className='font-semibold text-xl  bg-white p-1 rounded-full text-black text-center'>Income</Link>
        <Link   to="/dashboard/orders" className='font-semibold text-xl  bg-white p-1 rounded-full text-black  text-center'>Orders</Link>
        </nav>
      
</div>

{/* the main */}
<div className='bg-gray-100 rounded shadow-md  flex-1 '>
<Outlet/>
</div>




</div>




    </div>
  )
}

export default Dashboard