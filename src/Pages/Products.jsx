// import React, { useEffect, useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import supabase from '../lib/supabase'
// import toast from 'react-hot-toast'

// const Products = () => {

//     const location =useLocation()
//     const navigate=useNavigate()
//     const query=new URLSearchParams(location.search)
//     const searchTerm=query.get("search") || ""
//     const [active,setActive]=useState('all')
//     const [items,setItems]=useState([])
//     const [search,setSearch]=useState(searchTerm)
//     const[isLoading,setIsLoading]=useState(false)
//     const [visibleCount,setVisibleCount]=useState()
//     const categoryTags=[
//         "all",
//         "food",
//        "electronic",
//        "clothes",
//       "skincare",
//       "gym",
//       "baby"
//     ];


// useEffect(()=>{

//     fetchItams();
// }, []);
// useEffect(() => {
//   setVisibleCount(10);
// }, [active, search]);
// const fetchItams = async () => {
//   try {
//     setIsLoading(true);
//     const { data, error } = await supabase.from("items").select("*");
//     if (error) throw error;
//     setItems(data);
//     console.log("cadeeee",data)
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     toast.error(error.message);
//   } finally {
//     setIsLoading(false);
//   }
// };
// const filterItems = items.filter((item) => {
    
//   const matchCategory =
//     active === "all" ||
//     (item.tags &&
//       item.tags.toString().toLowerCase().includes(active.toLowerCase()));
//   const matchSearch = item.itemName.toLowerCase().includes(search.toLowerCase());
//   return matchCategory && matchSearch;
// });
// const visibleitems = filterItems.slice(0, visibleCount);
// if(isLoading){
//   return(
//   <div className="min-h-screen  flex items-center justify-center">
//   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
// </div>
// )
// }


    
//   return (
//     <div className="min-h-screen mx-auto  py-6 px-4 bg-blue-500">
//       <div className="max-w-7xl mx-auto">
//         {/* search */}
//         <div className="flex justify-center items-center">
//           <input
//             type="text"
//             placeholder="search for itmes"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-[70%] px-4 py-2 border border-gray-300 rounded-full shadow-sm mb-2 focus:ring-2 
//         focus:ring-gray-400 focus:outline-none"
//           />
//         </div>
//         {/* filter */}
//         <div className="flex justify-center  items-center mb-8">
//           <div className="flex flex-wrap gap-2  justify-center">
//             {categoryTags.map((tag, index) => (
//               <span
//                 onClick={() => setActive(tag)}
//                 className={`text-lg px-4 py-2 rounded-full shadow-sm cursor-pointer 
//               ${active === tag ? "bg-yellow-400" : "bg-white hover:bg-gray-200"}
//               `}
//                 key={index}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//         {/* protects */}
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
//             {visibleitems.map((item) => (
//               <Link
//                 className="bg-white p-4 rounded-lg shadow hover:shadow-md hover:scale-105 
//                 transform transition-transform duration-300 hover:transition-all"
//                 to={`/products/${item.id}`}
//                 key={item.id}
//               >
//                 <img
//                   className="w-full h-50 object-cover rounded-md mb-2"
//                   src={item.image_url}
//                   alt={item. itemName}
//                 />
//                 <div className="flex justify-between ">
//                 <h2 className="text-lg font-semibold mb-2">{item.itemName}</h2>
//                 <p>${item.price}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//         {/* visible */}
//         {filterItems.length > visibleCount && (
//           <div className="text-center mt-6">
//             <button
//               className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow"
//               onClick={() => setVisibleCount((prev) => prev + 10)}
//             >
//               load more
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
  
//   )
// }

// export default Products

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search") || "";

  const [active, setActive] = useState('all');
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(searchTerm);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState();



const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);
 

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const img = new Image();
      img.src = event.target.result;
  
      img.onload = async () => {
        await tf.ready(); // ensure TF is ready
        const model = await mobilenet.load();
  
        const predictions = await model.classify(img);
        console.log("Predictions:", predictions);
  
        const topPrediction = predictions[0]?.className;
        if (topPrediction) {
          searchSimilarProducts(topPrediction);
        } else {
          toast.error("No predictions found.");
        }
      };
  
      img.onerror = () => {
        toast.error("Failed to load image.");
      };
      img.onload = async () => {
        await tf.ready();
        const model = await mobilenet.load();
      
        const predictions = await tf.tidy(() => model.classify(img));
      
        console.log("Predictions:", predictions);
      
        const topPrediction = predictions[0]?.className;
        if (topPrediction) {
          searchSimilarProducts(topPrediction);
        } else {
          toast.error("No predictions found.");
        }
      };
      if (!model) {
        toast.error("Model not loaded yet.");
        return;
      }
      
      const predictions = await tf.tidy(() => model.classify(img));
    };
  
    reader.readAsDataURL(file);


    
  };
  

  




  const searchSimilarProducts = async (keyword) => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .ilike('itemName', `%${keyword}%`); // corrected here
  
    if (error) {
      console.error("Search failed:", error);
    } else {
      console.log("Matched Products:", data);
      setItems(data); // update the UI
    }
  };
  
  







  const categoryTags = ["all", "food", "electronic", "clothes", "skincare", "gym", "baby"];

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setVisibleCount(10);
  }, [active, search]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("items").select("*");
      if (error) throw error;
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterItems = items.filter((item) => {
    const matchCategory =
      active === "all" ||
      (item.tags && item.tags.toString().toLowerCase().includes(active.toLowerCase()));
    const matchSearch = item.itemName.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const visibleItems = filterItems.slice(0, visibleCount);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-2/3 lg:w-1/2 px-5 py-3 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

<input type="file" accept="image/*" onChange={handleImageUpload} />


        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10 flex-wrap gap-3">
          {categoryTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => setActive(tag)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                active === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border border-blue-400 hover:bg-blue-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleItems.map((item) => (
            <Link
              to={`/products/${item.id}`}
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 p-4"
            >
              <img
                src={item.image_url}
                alt={item.itemName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.itemName}</h3>
                <span className="text-blue-600 font-bold">${item.price}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {filterItems.length > visibleCount && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
