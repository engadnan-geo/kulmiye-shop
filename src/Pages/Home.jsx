import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTruck } from 'react-icons/fa';
import { FaShield } from "react-icons/fa6";
import supabase from "../lib/supabase";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';



const features = [
    {
      icon: <FaTruck  className="w-8 h-8 text-blue-500" />,
      title: "Fast Delivery",
      description: "Get your products delivered quickly and reliably."
    },
    {
      icon: <FaShield className="w-8 h-8 text-green-500" />,
      title: "Secure Payment",
      description: "Your transactions are protected and encrypted."
    },
    {
      icon: <FaCheckCircle className="w-8 h-8 text-purple-500" />,
      title: "Quality Guaranteed",
      description: "We offer only the best, verified products."
    }
  ];
  
  const testimonials = [
    {
      name: "Jane Doe",
      quote: "Amazing service and fantastic quality. Highly recommend!"
    },
    {
      name: "John Smith",
      quote: "Fast delivery and friendly customer support."
    }
  ];
  
  const featuredItems = [
    {
      name: "Premium Watch",
      price: "$199",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Leather Shoes",
      price: "$99",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Smartphone",
      price: "$499",
      image: "https://via.placeholder.com/150"
    }
  ];


  const images = [
    'https://media.istockphoto.com/id/475263838/photo/many-mixed-breads-and-rolls-shot-from-above.jpg?s=1024x1024&w=is&k=20&c=Gb2zz0dhe8cUJdjQdH63oQCvpRZSDZuJkis835JcvEU=',
    'https://media.istockphoto.com/id/1224326999/photo/pepper-bag-full-of-groceries.jpg?s=1024x1024&w=is&k=20&c=oNeH2YqFYGCsEtNFqZPthTTFELdfQ4EbjAhpw6-BDcQ=',
    'https://media.istockphoto.com/id/2174699310/photo/handsome-man-shopping-for-a-new-smartphone-in-an-electronics-store.jpg?s=2048x2048&w=is&k=20&c=so9jIM80bRyuCw3y8NOrPFzG1vC_feKJAH6S7_Ecn1M=',
  ];
  

const Home = () => {

    const [featureItems, setfeatureItems] = useState([]);

    const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);


    useEffect(() => {
        fetchItem();
      }, []);
      const fetchItem = async () => {
        const { data, error } = await supabase.from("items").select("*").limit(4);
        if (error) throw error;
        setfeatureItems(data);
    };

  return (
    <div className="space-y-16 p-6">
    {/* Hero */}
    
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        key={images[current]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[current]})`,
          filter: 'brightness(0.6)',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent " />

      {/* Hero Content */}
      <div className="relative  flex flex-col items-center justify-center h-full text-white text-center px-6 ">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Shop Smarter, Live Better
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl max-w-xl mb-6 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Discover quality products at unbeatable prices — handpicked for your lifestyle.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Explore Products
          </button>
        </motion.div>
      </div>
    </div>
    

    {/* How We Work */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-center shadow-md">How We Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-4 border rounded-xl text-center">
          <h3 className="font-bold text-xl mb-2">1.Search your neads</h3>
          <p>find what you need easy using  keywords.</p>
        </div>
        <div className="p-4 border rounded-xl text-center shadow-md">
          <h3 className="font-bold text-xl mb-2">2. Get Recommendations</h3>
          <p>We suggest top products tailored to you.</p>
        </div>
        <div className="p-4 border rounded-xl text-center shadow-md">
          <h3 className="font-bold text-xl mb-2">3. Easy Checkout</h3>
          <p>Quick and secure payment with fast delivery.</p>
        </div>
      </div>
    </section>

    {/* Features */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-xl text-center bg-gray-50 hover:shadow-md"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-center">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8  ">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-xl  shadow-sm  bg-blue-300"
          >
            <p className="text-base">"{t.quote}"</p>
            <p className="mt-4 font-semibold text-right">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Items */}
    <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Meals</h2>
        <Link
          className="block text-right text-lg text-orange-600 hover:underline font-semibold pr-4 mb-4"
          to="/product"
        >
          View All
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {featureItems.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.id}`} // Assuming your product pages are dynamic based on item id
              className="bg-white rounded-lg shadow-sm p-4 transform transition duration-300 hover:scale-105 hover:shadow-md"
            >
              <img
                src={item.image_url} // Assuming your items have a field 'image_url'
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="flex justify-between p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-orange-500 font-medium text-lg mt-1">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

  </div>
  );
};

export default Home;
