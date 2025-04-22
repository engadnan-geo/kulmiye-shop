import React, { useEffect, useState } from 'react'
import supabase from '../lib/supabase'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ManageItems = () => {
const[storeItem,setStoreItem]=useState([])
const[isLoading,setisLoading]=useState(false)
const[error,setError]=useState(false)

useEffect(()=>{
    fetchStore()
},[])
const fetchStore=async()=>{
    try {
        setisLoading(true)
        const{data,error}=await supabase.from("items").select("*")
        if(error)throw error
        setStoreItem(data)
    } catch (error) {
        console.error("Error fetch store items",error)
        toast.error("Error fetching srore item")
    }finally{
        setisLoading(false)
    }
}

const handledelete=async(id,image_url)=>{
const conformDelete=window.confirm("are you sure you want to delete ")
if(!conformDelete)return
try {
    if(image_url){
        const filePath=image_url.split("/").slice(-2).join("/")
        const {error:imageError}=await supabase.storage
        .from("imageitem")
        .remove("[filePath]")
        if(imageError)throw error
    }

    const error=await supabase.from("items")
    .delete()
    .eq("id",id)
    if(error)throw error
    setStoreItem((pre)=>pre.filter((item)=>item.id !==id))
} catch (error) {
    console.error("error delete item",error.message)
    toast.error("failed to delete")
}
}




  return (
    <div className='min-h-screen p-6 md:p-6 lg:p-8 '>
    <div className='flex flex-col flex-wrap'>

        <div className='flex justify-around items-center flex-wrap'>
            <h1 className='text-2xl md:4xl font-medium text-gray-800'>Manage items</h1>
            <p className='text-2xl text-gray-600 font-medium'>total items</p>

        </div>
{/* gride items */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
    {
        storeItem.map((item)=>(
            <div className='bg-white rounded-lg shadow-sm p-4  overflow-hidden hover:shadow-xl mt-2' key={item.id}>
       <img src={item.image_url} alt="" className='w-full h-48 object-cover' />
       <div className='mt-2 flex justify-between gap-2'>
        <h3> {item.itemName}</h3>
        
        <p className='text-gray-600 font-semibold text-base'>${item.price}</p>
       </div>
       <div className='flex justify-between items-center border-t- border-gray-200 py-4 space-x-2'>
        <button className='bg-blue-500 p-2 rounded-lg text-sm text-white hover:underline hover:text-gray-500 '
        onClick={()=>handledelete(item.id,item.image_url)}
        >delete</button>
        <Link to={`/dashboard/additems/${item.id}`} className='bg-blue-500 p-2 rounded-lg text-sm text-white '>updata</Link>
        <Link className='bg-blue-500 p-2 rounded-lg text-sm text-white '>view</Link>

       </div>
            </div>
        ))
    }

        </div>
    </div>


    </div>

  )
}

export default ManageItems