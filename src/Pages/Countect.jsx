import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Countect = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setMessages(data);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('messages').insert([
        {
          name,
          email,
          message,
        },
      ]);

      if (error) throw error;

      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');

      // Refresh messages
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      setMessages(data);
    } catch (err) {
      alert('Failed to send message: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-lg mb-2">Your Name</label>
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

          <div>
            <label htmlFor="email" className="block text-gray-700 text-lg mb-2">Your Email</label>
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

          <div>
            <label htmlFor="message" className="block text-gray-700 text-lg mb-2">Your Message</label>
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

          <div className="text-center">
            <button
              type="submit"
              className={`w-full py-3 mt-4 text-white rounded-lg ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } transition-all duration-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Reply section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">
          Your Previous Messages & Admin Replies
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-gray-50 p-4 rounded-lg border">
                <p><strong className="text-blue-700">You:</strong> {msg.message}</p>
                {msg.reply && (
                  <p className="mt-2 text-green-700">
                    <strong>Admin Reply:</strong> {msg.reply}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Info + Socials */}
      <section className="bg-white py-10 text-center">
      <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
      <div className="flex justify-center gap-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-8 h-8 text-blue-600 hover:scale-110 transition" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-8 h-8 text-sky-500 hover:scale-110 transition" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-8 h-8 text-pink-500 hover:scale-110 transition" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-8 h-8 text-blue-700 hover:scale-110 transition" />
        </a>
      </div>
    </section>
    </div>
  );
};

export default Countect;
