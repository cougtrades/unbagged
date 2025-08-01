'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [totalFees, setTotalFees] = useState(137.31);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple authentication - you can change this password
  const ADMIN_PASSWORD = 'unbagged2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Incorrect password');
    }
  };

  const handleUpdateFees = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/fees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalFees: parseFloat(totalFees.toString()) }),
      });

      if (response.ok) {
        setMessage('Total fees updated successfully!');
      } else {
        setMessage('Failed to update fees');
      }
    } catch (error) {
      setMessage('Error updating fees');
    }

    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          {message && (
            <p className="mt-4 text-red-600 text-center">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        
        <form onSubmit={handleUpdateFees}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Total Fees (SOL)
            </label>
            <input
              type="number"
              step="0.01"
              value={totalFees}
              onChange={(e) => setTotalFees(parseFloat(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
              placeholder="Enter total fees"
            />
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Calculated Values:</h3>
            <div className="space-y-1 text-sm">
              <div>Bags Removed: {(totalFees * 3300).toLocaleString()}</div>
              <div>Ocean Cleanup: {(totalFees * 0.9).toFixed(2)} SOL</div>
              <div>Marketing Budget: {(totalFees * 0.1).toFixed(2)} SOL</div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update Total Fees'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <button
          onClick={() => setIsAuthenticated(false)}
          className="w-full mt-4 bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 