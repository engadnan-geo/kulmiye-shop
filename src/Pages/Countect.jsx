import React, { useState } from 'react';

const Countect = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission delay
    setTimeout(() => {
      alert('Message sent successfully!');
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-6">
      {/* Contact Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">
          Contact Us
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 text-lg mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-lg mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-gray-700 text-lg mb-2" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="6"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`w-full py-3 mt-4 text-white rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">
          Our Contact Information
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Feel free to reach us at the following contact methods.
        </p>

        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-blue-600 font-semibold mr-4">📧 Email:</span>
            <span className="text-gray-700">contact@yourdomain.com</span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-600 font-semibold mr-4">📞 Phone:</span>
            <span className="text-gray-700">+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-600 font-semibold mr-4">🏢 Office:</span>
            <span className="text-gray-700">123 Street, City, Country</span>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">
          Follow Us
        </h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            <i className="fab fa-twitter text-3xl"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            <i className="fab fa-facebook text-3xl"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            <i className="fab fa-instagram text-3xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Countect