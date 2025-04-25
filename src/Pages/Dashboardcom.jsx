import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase"; // Ensure correct path

const Card = ({ title, value, color }) => (
  <div className={`bg-${color}-100 p-6 rounded-2xl shadow text-center`}>
    <h2 className={`text-xl font-semibold text-${color}-700`}>{title}</h2>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

const Dashboardcom = () => {
  const [totals, setTotals] = useState({
    income: 0,
    productPrice: 0,
    orders: 0,
    products: 0,
    totalValue: 0,  // For the combined value
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch total income
      const { data: incomes, error: incomeError } = await supabase
        .from("incomes")
        .select("amount");

      if (incomeError) throw incomeError;

      const totalIncome = incomes.reduce((sum, item) => sum + (item.amount || 0), 0);

      // Fetch total product prices (sum of 'price' from the 'items' table)
      const { data: products, error: productError } = await supabase
        .from("items")  
        .select("price");  

      if (productError) throw productError;

      const totalProductPrice = products.reduce((sum, product) => sum + (product.price || 0), 0);

      // Fetch total orders
      const { data: orders, error: orderError } = await supabase
        .from("order")
        .select("id");

      if (orderError) throw orderError;

      const combinedValue = totalIncome + totalProductPrice;

      setTotals({
        income: totalIncome,
        productPrice: totalProductPrice,
        orders: orders.length,
        products: products.length, 
        totalValue: combinedValue, 
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Realtime listeners
    const incomeChannel = supabase
      .channel("income-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "incomes" },
        fetchData
      )
      .subscribe();

    const productChannel = supabase
      .channel("product-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        fetchData
      )
      .subscribe();

    const orderChannel = supabase
      .channel("order-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order" },
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(incomeChannel);
      supabase.removeChannel(productChannel);
      supabase.removeChannel(orderChannel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          📊 Dashboard Overview
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card title="Total Income" value={`$${totals.income.toFixed(2)}`} color="green" />
            <Card title="Total Product Price" value={`$${totals.productPrice.toFixed(2)}`} color="purple" />
            <Card title="Total Orders" value={totals.orders} color="blue" />
            <Card title="Total Products" value={totals.products} color="yellow" />
            {/* Added a new card for combined value */}
            <Card title="Income + Product Price" value={`$${totals.totalValue.toFixed(2)}`} color="red" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboardcom;
