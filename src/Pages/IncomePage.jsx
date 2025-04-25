import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const IncomePage = () => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [note, setNote] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch income records from the database
  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('incomes')
      .select('*, item:items(itemName)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching incomes:', error);
      toast.error('Failed to load incomes');
    } else {
      setIncomes(data);
    }
    setIsLoading(false);
  };

  // Handle adding a new income record
  const handleAddIncome = async (e) => {
    e.preventDefault();
    if (!amount || !source) {
      toast.error('Amount and source are required');
      return;
    }
    const { data, error } = await supabase.from('incomes').insert([
      {
        amount: parseFloat(amount),
        source,
        note,
      },
    ]);
    if (error) {
      console.error(error);
      toast.error('Failed to add income');
    } else {
      toast.success('Income added');
      setAmount('');
      setSource('');
      setNote('');
      fetchIncomes(); // Refresh income list
    }
  };

  // Handle income deletion
  const handleDelete = async (id) => {
    const { error } = await supabase.from('incomes').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete');
    } else {
      toast.success('Income deleted');
      fetchIncomes(); // Refresh income list
    }
  };

  // Calculate the total income
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10 px-4">
      {/* Add Income Form */}
      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">💰 Income Tracker</h2>
        <form onSubmit={handleAddIncome} className="space-y-3">
          <input
            type="number"
            placeholder="Amount"
            className="w-full border rounded p-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Source (e.g., freelance)"
            className="w-full border rounded p-2"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <textarea
            placeholder="Note (optional)"
            className="w-full border rounded p-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Income
          </button>
        </form>
      </div>

      {/* Display Total Income */}
      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Total Income: <span className="text-green-600">${totalIncome.toFixed(2)}</span>
        </h3>
      </div>

      {/* Display Income List */}
      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md mt-6">
        {isLoading ? (
          <div className="text-center">Loading incomes...</div>
        ) : (
          <ul className="space-y-4">
            {incomes.map((income) => (
              <li
                key={income.id}
                className="p-4 bg-blue-100 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    ${income.amount.toFixed(2)} — {income.source}
                  </p>
                  {income.note && <p className="text-sm text-gray-600">{income.note}</p>}
                  <p className="text-sm text-gray-500">
                    {format(new Date(income.created_at), 'PPP')}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(income.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IncomePage;
