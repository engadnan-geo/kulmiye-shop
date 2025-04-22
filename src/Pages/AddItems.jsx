import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import supabase from '../lib/supabase'
import { useParams } from 'react-router-dom'
import { FaDeskpro } from 'react-icons/fa'






const AddItems = () => {
    const {id}=useParams()
const isEditMode=Boolean(id)
const [formData,setformData]=useState({
    itemName:"",
    price:"",
    Discription:"",
    tags:[],
    image:null
})

useEffect(()=>{
    fetchItem()
},[id,isEditMode])
const fetchItem=async()=>{
if(isEditMode){
    const{data,error}=await supabase.from("items")
    .select("*")
    .eq("id",id)
    .single()
    if(error){
        toast.error("failed to load")

    }
else{
    setformData({
        itemName:data.name || "",
        price:data.price ||"",
        tags:data.tags || [],
        image:null,
        Discription:data.Discription,
        image_url:data.image_url || null
    })
}
}
}





const categoryTages=[
    "food",
    "electronic",
    "clothes",
    "skincare",
    "gym",
    "baby"
]

const handlechange=(e)=>{
    const{id,value}=e.target
    setformData((pre)=>({...pre,[id]:value}))
}

const handleImage=(e)=>{
    const file=e.target.files[0]
    setformData((pre)=>({...pre,image:file}))
}

const toggleTage=(tag)=>{
    setformData((pre)=>({...pre,tags:pre.tags.includes(tag)?pre.tags.filter(t=>t!==tag):[...pre.tags,tag]}))
}

const handlesubmit=async(e)=>{
e.preventDefault()
try {
    let imageUrl=formData.image_url || null;
    if(formData.image){
        const file=formData.image
        if(!file || !file.type.startsWith("image/")){
            toast.error("please select avalid image file");
            return
        }

        const fileEx=file.name.split(".").pop().toLowerCase()
        const fileName=`${Date.now()}.${fileEx}`
        const filePath=`items/${fileName}`
        console.log(fileName,fileEx,file)
        const {data:storagedata,error:uploadError}=await supabase.storage
        .from("imageitem")
        .upload(filePath,file,{
            contentType:file.type,
            upsert:false,
        })
        if(uploadError)throw uploadError
        const {data:publicImage}= supabase.storage.from('imageitem')
        .getPublicUrl(filePath)
        imageUrl=publicImage.publicUrl
                
      
    }


    let error=null;
    if(isEditMode){
        const{error:updataError}=await supabase.from("items")
        .update({
            itemName:formData.itemName,
            price:parseFloat(formData.price),
           Discription:formData.Discription,
           tags:formData.tags,
           image_url:imageUrl
        })
        .eq("id",id);
        error=updataError
    }else{
        const{error:inertError}=await supabase.from("items").insert([
            {
                itemName:formData.itemName,
                Discription:formData.Discription,
                price:parseFloat(formData.price),
                image_url:imageUrl,
                tags:formData.tags
            }
        ])
        error=inertError;
    }
    if(error)throw error;
    toast.success("items added successfully!");
    setformData({
        itemName:"",
        price:"",
        tags:[],
        image:"",
        Discription:""
    })

} catch (error) {
    console.log("error adding itmes",error.message)
    toast.error(isEditMode?"error updating item ": "error adding item")
}
}



  return (
    < div className='min-h-screen mx-auto'>
     
       <div className='mt-10'><h1 className='text-center font-bold text-xl  '>{isEditMode?"Edite Items":"Add New Item"}</h1></div> 
        <div className='mt-10 '  >
            <form  className=' space-y-2  ' onSubmit={handlesubmit}  >
                <div className='flex flex-col space-y-2'>
                  <label htmlFor="" className='text-gray-700 font-bold text-xl' >Item Name<input type="text" 
                  id='itemName'
                  className='w-full px-4 py-2 border  border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={formData.itemName}
                  onChange={handlechange}
                  /></label>
                  <label htmlFor="" className='text-gray-700 font-bold text-xl'>Price<input id="price" type="text" className='w-full px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  value={formData.price}
                  onChange={handlechange}
                  /></label>
                 
                  <label htmlFor="" className='text-gray-700 font-bold text-xl'>Discription<textarea id='Discription' placeholder="Write your message here"className='w-full px-4 py-2 border  border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={formData.Discription}
                  onChange={handlechange}
                  /></label>
                  <label htmlFor="" className='text-gray-700 font-bold text-xl'><input type="file" name="" id=""   className="text-sm text-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0   file:text-sm file:font-semibold file:bg-blue-500 file:text-text-50 hover:file:bg-blue-200" accept="image/*" 
                  onChange={handleImage}
                  /></label>

                <span>Select Tages</span>
                <div className='flex flex-wrap gap-2 mb-2'>
                   {
                    categoryTages.map((tag)=>(
                        <button key={tag} type='button' className={`px-3 py-1 rounded-full text-sm font-medium border ${
                            formData.tags.includes(tag)?"bg-red-600"
                            :"bg-blue-700 text-gray-50"
                        }`}
                        onClick={()=>toggleTage(tag)}
                        >
                            {tag}
                        </button>
                    ))
                   }
                </div>

                <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-950 transition'>
     {isEditMode?"Upadate item":"Add Item"}
                </button>

                  </div>  
            </form>
        </div>
     </div>
    
  )
}

export default AddItems