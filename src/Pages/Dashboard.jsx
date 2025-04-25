



import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-4">
      <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto">

        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white shadow-md rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600 mb-6">MyDashboard</div>
          <nav className="flex flex-col gap-3">
            <Link to="/dashboard/additems" className="text-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full transition">
              Add Items
            </Link>
            <Link to="/dashboard/manageitems" className="text-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full transition">
              Manage Items
            </Link>
            <Link to="/dashboard/income" className="text-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full transition">
              Income
            </Link>
            <Link to="/dashboard/orders" className="text-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full transition">
              Orders
            </Link>
            <Link to="/dashboard/messege" className="text-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full transition">
              masseges
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white shadow-md rounded-xl p-6">
            
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
