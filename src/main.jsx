import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './Pages/About.jsx'
import Home from './Pages/Home.jsx'
import Countect from './Pages/Countect.jsx'
import Products from './Pages/Products.jsx'
import Carts from './Pages/Carts.jsx'
import SinginPage from './Pages/SinginPage.jsx'
import SingupPage from './Pages/SingupPage.jsx'
import UnAuthenticatedRoute from './components/UnAuthenticatedRoute.jsx'
import Dashboard from './Pages/Dashboard.jsx'



const routerprovider=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/home",
        element:<Home/>,
        index:true
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contect",
        element:<Countect/>
      },
      {
        path:"/product",
        element:<Products/>
      },
      {
        path:"/carts",
        element:<UnAuthenticatedRoute> <Carts/></UnAuthenticatedRoute>  
      },
      {
        path:"/signin",
        element: <UnAuthenticatedRoute><SinginPage/></UnAuthenticatedRoute>   
      },
      {
       path:"/signup" ,
       element: <UnAuthenticatedRoute><SingupPage/></UnAuthenticatedRoute>
       
      },
      
      {
        path:"/dashboard",
        element:<UnAuthenticatedRoute> <Dashboard/></UnAuthenticatedRoute>   
      }

    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={routerprovider}/>
  </StrictMode>,
)
