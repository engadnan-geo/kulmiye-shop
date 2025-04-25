import { useEffect, useState } from "react"
import  supabase  from "../lib/supabase"

const SeeOrders = () => {
  const[orderItems,setOrderItems]=useState([])
  const[isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    fetchOrders()
  },[])
  const fetchOrders=async()=>{
    try {
      setIsLoading(true)
      const{data,error}=await supabase.from('order')
      .select('*')
      if(error)throw error
      setOrderItems(data)
    } catch (error) {
      console.error("Failed to fetch orders",error)
    }finally{
      setIsLoading(false)
    }
  }
  const handleStatus=async(orderId,curentStatus)=>{
    const newStatus=curentStatus==='pending'?'delivered':'pending'
    const{error}=await supabase.from('order')
    .update({status:newStatus})
    .eq('id',orderId)
    if(error)throw error
    setOrderItems((prev)=>prev.map((order)=>order.id==orderId?{...order,status:newStatus}:order))
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-orange-500 rounded-full border-t-transparent" />
      </div>
    );
  }
  return (
    <div className="min-h-screen  py-8 px-4 sm:px-8 bg-white">
      <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Users Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {
        orderItems.map((order)=>(
          <div
           key={order.id}
           className="bg-white shadow-md rounded-lg p-4 border">
            <h2></h2>
            <p className="text-gray-600">customer: {order.user_name}</p>
            <p className="text-gray-600">ordered: {order.item_name}</p>
            <p className="text-gray-600">Quantity: {order.quantity}</p>
            <p className="text-gray-600">price: {order.price*order.quantity}</p>
            <p>status: 
            <span 
            className={`text-sm font-semibold bg-sky-500 px-2 py-1 rounded-lg ${order.status === "pending" ? "text-yellow-200" : "text-green-200"}`}
            onClick={() => handleStatus(order.id, order.status)}
            >{order.status}</span>
            </p>
            <p className="text-gray-600">Location: {order.location}</p>
            <p className="text-gray-600">Created At: {new Date(order.created_at).toLocaleString()}</p>
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default SeeOrders
