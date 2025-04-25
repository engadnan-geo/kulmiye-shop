import { useEffect, useReducer, useState } from "react"
import { useNavigate, useParams } from "react-router"
import supabase  from "../lib/supabase"
import toast from "react-hot-toast"
import { IoArrowBackOutline } from "react-icons/io5"
import { useAuth } from '../context/AuthContext';

const Product = () => {
  const{id}=useParams()
  const[item,setItem]=useState(null)
  const[isLoading,setIsLoading]=useState(false)
  const[isAdded,setIsAdded]=useState(false)
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const navigate=useNavigate()
  const{isLoggedIn}=useAuth()



  
  useEffect(()=>{
    fetchItem()
  },[id])
  const fetchItem=async()=>{
    try {
      setIsLoading(true)
      const{data,error}=await supabase.from('items')
      .select('*')
      .eq('id',id)
      .single()
      if(error)throw error
      setItem(data)
       const cartItem = await checkCart(data.id);
    setIsAdded(cartItem ? true : false);
    const orderItem=await checkOrder(data.id)
    setIsOrdered(orderItem?true:false)
    setOrderStatus(orderItem?.status || "");
      console.log(data)
    } catch (error) {
      console.error("Failed to fetch product",error)
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  const initailState={quantity:1}
  const reducer=(state,action)=>{
    switch (action.type) {
      case 'increase':
        return{...state,quantity:state.quantity+1}
      case 'decrease':
        return{...state,quantity:state.quantity-1}
      default:
        break;
    }
  }
  const[state,dispatch]=useReducer(reducer,initailState)
  const handleBack=()=>{
    navigate(-1)
  }
  const checkCart=async(productId)=>{
    const { data: { user } } = await supabase.auth.getUser();
    const{data}=await supabase.from('cart')
    .select('*')
    .eq("user_id", user.id)
    .eq("product_id",productId)
    .single()
    return data
  }
  const checkOrder=async(productId)=>{
    const { data: { user } } = await supabase.auth.getUser();
    const{data}=await supabase.from('order')
    .select('*')
    .eq("user_id", user.id)
    .eq("product_id",productId)
    .single()
    return data
  }
const handleCart =async () => {
  if (!isLoggedIn) {
    toast.custom((choose) => (
      <span className="fixed top-20 right-6 bg-white p-4 shadow-lg rounded-xl w-72">
        You need to be signed in to add to cart
        <div className="mr-2 flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(choose.id);
              navigate("/signin");
            }}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              toast.dismiss(choose.id);
            }}
            className="text-sm bg-gray-500 text-white px-3 py-1 rounded"
          >
            Not now
          </button>
        </div>
      </span>
    ));
    return
  }
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if(isAdded){
      const{error}=await supabase.from('cart')
      .delete()
      .eq('user_id',user.id)
      .eq('product_id',item.id)
      if (error) throw error;
      toast.success("Removed from cart!");
      setIsAdded(false);
    }else{
      const{error}=await supabase.from('cart')
      .insert({
        user_id:user.id,
        product_id:item.id,
        item_name:item.name,
        price:item.price,
        image_url:item.image_url,
        tags:item.tags,
        describe:item.describe,
        quantity:state.quantity
      })
      if(error)throw error
      toast.success("Added to cart!");
    setIsAdded(true)
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    toast.error("Something went wrong.");
  }
};
const handleBuy=async()=>{
  if (!isLoggedIn) {
    toast.custom((choose) => (
      <span className="fixed top-20 right-6 bg-white p-4 shadow-lg rounded-xl w-72">
        You need to be signed in to add to cart
        <div className="mr-2 flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(choose.id);
              navigate("/signin");
            }}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              toast.dismiss(choose.id);
            }}
            className="text-sm bg-gray-500 text-white px-3 py-1 rounded"
          >
            Not now
          </button>
        </div>
      </span>
    ));
    return
  }
  try {
    const{data:{user}}=await supabase.auth.getUser()
    const { data: userinfo, error:errorInfo } = await supabase
  .from('user')
  .select()
  .eq('id', user.id)
  .single()
  if(errorInfo)throw errorInfo
    const result=await fetch('https://ipapi.co/json/')
    const locatinData=await result.json()
    const location=`${locatinData.city},${locatinData.country_name}`
    if(isOrdered){
      const{error}=await supabase.from('order')
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", item.id);
      if(error)throw error
      toast.success("Order canceled");
      setIsOrdered(false);
      setOrderStatus('')
    }else{
      const{error}=await supabase.from('order')
  .insert({
    user_id:user.id,
    user_name:userinfo.username,
    product_id: item.id,
    item_name: item.name,
    price: item.price,
    image_url: item.image_url,
    quantity: state.quantity,
    status: "pending",
    location:location
  })
  if(error)throw error
  toast.success('order placed')
  setIsOrdered(true);
  const { data, error:status } = await supabase
  .from('order')
  .select('*')
  .eq("user_id", user.id)
  .eq("product_id", item.id)
  .single();

if (status) {
  console.error("Error fetching order status:", error.message);
  return;
}

setOrderStatus(data.status);
    }
  } catch (error) {
    console.error("Failed to place order:", error.message);
    toast.error("Could not place the order.");
  }
}
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-orange-500 rounded-full border-t-transparent" />
      </div>
    );
  }
  if(!item) return null
  return (
    <div className="min-h-screen py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <div>
            <div>
              <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
                <IoArrowBackOutline className="text-xl"/>
               <span className="text-lg mb-1 "> go back</span>
              </button>
            </div>
            <img
            className="w-full object-cover"
            src={item.image_url} alt={item.name} />
          </div>
          <div className="mt-16 flex flex-col space-y-2">
            <h2 className="text-2xl sm:text-4xl">{item.name}</h2>
            <span className="text-2xl flex sm:text-4xl items-center">
              {
                state.quantity>1&&<button
                onClick={()=>dispatch({type:'decrease'})}
                className="bg-gray-50 p-2 rounded">
                  -
                </button>
              }
              {state.quantity}
              <button
              onClick={()=>dispatch({type:'increase'})}
              className="bg-gray-50 p-2 rounded">+</button>
            </span>
            <span className="text-lg sm:text-xl font-semibold">${item.price*state.quantity}</span>
            {item.describe&&<p>{item.describe}</p>}
            {orderStatus && (
              <p className="text-sm text-gray-500 mt-2">
                Order Status: <span className="font-bold text-orange-400">{orderStatus}</span>
              </p>
            )}
            <div className="space-x-1 mt-2">
              <button
              onClick={handleCart}
              className="bg-orange-500 text-white py-2 px-4 rounded-lg">{
                isAdded?'remove cart':'add to cart'
              }</button>
              <button
              onClick={handleBuy}
              className="bg-orange-500 text-white py-2 px-4 rounded-lg">
                {isOrdered?'cancel order':'buy now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product