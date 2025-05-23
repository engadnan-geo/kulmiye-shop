// import  { useEffect, useState } from "react";
// import supabase  from "../lib/supabase";
// import toast from "react-hot-toast";
// import { Link } from "react-router";
// const Carts = () => {
//   const [cartItem, setCartItem] = useState([]);
//   const [isLoading, setisloading] = useState(false);
//   useEffect(() => {
//     fetchCart();
//   },[]);
//   const fetchCart = async () => {
//     try {
//       setisloading(true);
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
      
//       if (userError) throw userError;
//       if (!user) {
//         toast.error("You must be logged in to view the cart.");
//         return;
//       }
//       const { data, error } = await supabase.from("cart").select("*")
//       .eq('user_id',user.id)
//       if (error) throw error;
//       setCartItem(data);     
//     } catch (error) {
//       console.error("error fetching cart item", error);
//       toast.error(error.message);
//     } finally {
//       setisloading(false);
//     }
//   };
//   const handleDelete=async(id)=>{
//     try {
//         const{error}=await supabase.from('cart')
//         .delete()
//         .eq('product_id',id)
//         if(error)throw error
//         setCartItem((prev)=>prev.filter((cart)=>cart.product_id!==id))
//         toast.success('Item removed from cart')
//     } catch (error) {
//         console.error('failed to delete',error)
//         toast.error(error.message)
//     }
//   }
//   if(isLoading){
//     return(
//     <div className="min-h-screen flex items-center justify-center">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
// </div>
// )
// }
//   return (
//     <div className="min-h-screen py-6 px-4 bg-gradient-to-r from-white to-gray-100">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold mb-4">your cart</h2>
//         {cartItem.length === 0 ? (
//           <p className="text-gray-600 text-center">your cart is empty</p>
//         ) : (
//             <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {cartItem.map((cart) => (
//               <div
//                 key={cart.product_id}
//                 className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
//               >
//                 <Link to={`/products/${cart.product_id}`}>
//                   <img
//                     src={cart.image_url}
//                     alt={cart.item_name}
//                     className="w-full h-48 object-cover rounded-lg"
//                   />
//                   <h1 className="mt-2 text-lg font-semibold">
//                     {cart.item_name}
//                   </h1>
//                   <p className="text-sm text-gray-600">{cart.describe}</p>
//                   <p className="mt-1 text-orange-500 font-bold">${cart.price}</p>
//                 </Link>
//                 <button
//                     onClick={() => handleDelete(cart.product_id)}
//                     className='mt-3 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600'
//                   >
//                     Remove
//                   </button>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 flex justify-between items-center pt-4">
//             <h3 className="text-xl font-semibold">total:</h3>
//             <span className="text-2xl font-bold text-orange-600">
//                 ${cartItem.reduce((total,item)=>total+(item.price*item.quantity),0)}
//             </span>
//           </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Carts


import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Carts = () => {
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setisloading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setisloading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) {
        toast.error("You must be logged in to view the cart.");
        return;
      }

      const { data, error } = await supabase.from("cart").select("*").eq("user_id", user.id);
      if (error) throw error;
      setCartItem(data);
    } catch (error) {
      console.error("error fetching cart item", error);
      toast.error(error.message);
    } finally {
      setisloading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("cart").delete().eq("product_id", id);
      if (error) throw error;
      setCartItem((prev) => prev.filter((cart) => cart.product_id !== id));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("failed to delete", error);
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
          🛒 Your Cart
        </h2>

        {cartItem.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cartItem.map((cart) => (
                <div
                  key={cart.product_id}
                  className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-5 hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between"
                >
                  <Link to={`/products/${cart.product_id}`}>
                    <img
                      src={cart.image_url}
                      alt={cart.item_name}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <h1 className="text-xl font-bold text-gray-800">{cart.item_name}</h1>
                    <p className="text-sm text-gray-600 mb-2">{cart.describe}</p>
                    <p className="text-lg font-bold text-orange-500">${cart.price}</p>
                  </Link>
                  <button
                    onClick={() => handleDelete(cart.product_id)}
                    className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-md hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center bg-white/50 backdrop-blur-md p-4 rounded-xl shadow-md">
              <h3 className="text-2xl font-medium text-gray-800 mb-4 md:mb-0">Total:</h3>
              <span className="text-3xl font-extrabold text-orange-600 tracking-wide">
                $
                {cartItem
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carts;
