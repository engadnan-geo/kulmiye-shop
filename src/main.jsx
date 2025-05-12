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
import ProfilePage from './Pages/ProfilePage.jsx'
import IncomePage from './Pages/IncomePage.jsx'
import AddItems from './Pages/AddItems.jsx'
import ManageItems from './Pages/ManageItems.jsx'
import Product from './Pages/Product.jsx'
import SeeOrders from './Pages/SeeOders.jsx'
import MessagesPage from './Pages/Masseges.jsx'
import Dashboardcom from './Pages/Dashboardcom.jsx'




const routerprovider=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index: true, 
        element: <Home />
      },
      {
        path: "home", 
        element: <Home />
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
        path:"products/:id",
        element:<Product/>
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
        path:"/profile",
        element:<ProfilePage/>
      },
      
      {
        path:"/dashboard",
        element:<UnAuthenticatedRoute> <Dashboard/></UnAuthenticatedRoute> ,
        children:[
          {
            path:"",
            element:<Dashboardcom/>,
             index:true
          },
          {
            path:"additems",
            element:< AddItems/>,
            

          },
          {
            path:"/dashboard/additems/:id",
            element:< AddItems/>
          },
          {
            path:"manageitems",
            element:<ManageItems/>
          },
          {
            path:"income",
             element:<IncomePage/>
          },

          {
            path:"orders",
            element:<SeeOrders/>

          },
          {
            path:"messege",
            element:<MessagesPage/>
          }
        ]
        
      }

    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
     <RouterProvider router={routerprovider}/>
     
  </StrictMode>,
)
