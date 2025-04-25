import React from "react";
import { ShoppingCart, BarChart3, Users, DollarSign } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md text-center">
    <div className="flex justify-center mb-4">
      <Icon size={40} className="text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="px-4 py-12 max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl">
        <h1 className="text-4xl font-bold mb-4">About SmartCart</h1>
        <p className="text-lg max-w-2xl mx-auto">
          A modern system designed for buyers, sellers, and store founders — track income, manage products, and grow your business.
        </p>
      </section>

      {/* Mission Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We believe that managing a store should be easy, powerful, and accessible. SmartCart empowers users to handle everything — from product listings to income tracking — with clarity and speed.
        </p>
        <img
          src="https://media.istockphoto.com/id/1215280342/photo/close-up-shot-red-darts-arrows-in-the-target-center-on-dark-blue-sky-background-business.jpg?s=1024x1024&w=is&k=20&c=maY50T4CNdctlHSKTXcVeZWo82sMAaYoNfonHEFDzwA="
          alt="SmartCart Dashboard"
          className="mt-10 rounded-2xl shadow-xl w-full max-w-4xl mx-auto"
        />
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Why SmartCart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={ShoppingCart}
            title="Easy Selling"
            description="Add, edit, and manage products in seconds — no tech skills needed."
          />
          <FeatureCard
            icon={BarChart3}
            title="Income Tracking"
            description="Visualize earnings and keep your finances in check effortlessly."
          />
          <FeatureCard
            icon={Users}
            title="Multi-User Friendly"
            description="Built for teams, founders, and individuals alike — everyone can benefit."
          />
          <FeatureCard
            icon={DollarSign}
            title="Grow Your Store"
            description="Smart tools to scale your shop and maximize profits."
          />
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gray-100 py-16 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to build your store?</h2>
        <p className="text-gray-700 mb-6">SmartCart makes it simple. Start today and take control of your business future.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
