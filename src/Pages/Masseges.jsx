import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch messages on page load
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (!error) {
        setMessages(data);
      }
      setLoading(false);
    };
    fetchMessages();
  }, []);

  // Handle reply input change
  const handleReplyChange = (id, value) => {
    setReplies({ ...replies, [id]: value });
  };

  // Handle saving the reply to Supabase
  const handleReplySubmit = async (id) => {
    const reply = replies[id];
    const { error } = await supabase.from('messages').update({ reply }).eq('id', id);
    if (!error) {
      alert('Reply saved');
      setReplies({ ...replies, [id]: '' });
      // refresh messages
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      setMessages(data);
    } else {
      alert('Failed to save reply');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-blue-300">
      <h1 className="text-3xl font-bold mb-6 text-center">📨 Messages Dashboard</h1>
      {loading ? (
        <p className="text-center">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-lg shadow">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Reply:</strong> {msg.reply || 'No reply yet'}</p>

              <div className="mt-4">
                <textarea
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded"
                  value={replies[msg.id] || ''}
                  onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                />
                <button
                  onClick={() => handleReplySubmit(msg.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
