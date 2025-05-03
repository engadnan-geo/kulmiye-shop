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
    <div className="min-h-screen py-8 px-4 sm:px-8 bg-blue-300">
  <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center text-gray-50">Users Orders</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md border border-blue-800">
      <thead>
        <tr className="bg-blue-500 text-white text-left text-sm sm:text-base">
          <th className="py-3 px-4">Customer</th>
          <th className="py-3 px-4">Ordered</th>
          <th className="py-3 px-4">Quantity</th>
          <th className="py-3 px-4">Price</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Location</th>
          <th className="py-3 px-4">Created At</th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map((order) => (
          <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-100 text-gray-700">
            <td className="py-2 px-4">{order.user_name}</td>
            <td className="py-2 px-4">{order.item_name}</td>
            <td className="py-2 px-4">{order.quantity}</td>
            <td className="py-2 px-4">${order.price * order.quantity}</td>
            <td className="py-2 px-4">
              <span
                className={`text-sm font-semibold bg-sky-500 px-2 py-1 rounded-lg cursor-pointer ${
                  order.status === "pending" ? "text-red-500" : "text-green-200"
                }`}
                onClick={() => handleStatus(order.id, order.status)}
              >
                {order.status}
              </span>
            </td>
            <td className="py-2 px-4">{order.location}</td>
            <td className="py-2 px-4">{new Date(order.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default SeeOrders
