import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../App.css';

function Pay() {
  const location = useLocation();
  const { packageId } = location.state || {};
  const [userId, setUserId] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const API_URL = 'https://tron-networks-6ij712yve-trixogen254s-projects.vercel.app';
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/pay`, { userId, packageId, mpesaNumber });
      alert(response.data);
    } catch (error) {
      alert('Payment failed');
    }
  };

  return (
    <div id="app">
      <form onSubmit={handleSubmit}>
        <h2>Pay for Package</h2>
        <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
        <input type="text" placeholder="Package ID" value={packageId} disabled required />
        <input type="tel" placeholder="M-Pesa Number" value={mpesaNumber} onChange={e => setMpesaNumber(e.target.value)} required />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default Pay;
