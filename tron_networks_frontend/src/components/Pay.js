import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './App.css'; // Ensure you import the CSS

function Pay() {
  const location = useLocation();
  const { packageId } = location.state || {};
  const [userId, setUserId] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://tron-networks-trixogen254-trixogen254s-projects.vercel.app/api/pay`, { userId, packageId, mpesaNumber });
      alert(response.data);
    } catch (error) {
      alert('Payment failed: ' + error.response.data);
    }
  };

  return (
    <div id="app">
      <form onSubmit={handleSubmit}>
        <h2>Pay for Package</h2>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Package ID"
          value={packageId}
          disabled
          required
        />
        <input
          type="tel"
          placeholder="M-Pesa Number"
          value={mpesaNumber}
          onChange={e => setMpesaNumber(e.target.value)}
          required
        />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default Pay;
