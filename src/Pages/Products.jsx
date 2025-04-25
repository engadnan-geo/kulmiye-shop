
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

        {/* Product Grid or No Results */}
        {visibleItems.length > 0 ? (
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
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-gray-700">No items found</h2>
            <p className="mt-2 text-gray-600">Try adjusting your search or filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setActive("all");
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

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
