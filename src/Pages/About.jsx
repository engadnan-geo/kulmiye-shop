import React from "react";

const About = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-16">
      {/* Header Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">About SmartCart</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Empowering your shopping journey with smart, fast, and secure solutions.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          At SmartCart, we aim to revolutionize the way people shop online by integrating AI-powered tools for a smarter experience. From product discovery to checkout, our platform is designed to deliver convenience and satisfaction.
        </p>
      </section>

      {/* Our Values */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Continuously evolving with the latest technologies to offer you the best.
            </p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
            <p className="text-gray-600">
              Building trust through transparency, fairness, and commitment.
            </p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
            <p className="text-gray-600">
              Putting your needs at the center of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="text-center p-4 bg-white shadow rounded-xl">
              <img
                src={`https://via.placeholder.com/150?text=Member+${num}`}
                alt={`Team Member ${num}`}
                className="mx-auto rounded-full w-32 h-32 mb-4 object-cover"
              />
              <h3 className="font-bold text-xl">Team Member {num}</h3>
              <p className="text-gray-500">Position {num}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
