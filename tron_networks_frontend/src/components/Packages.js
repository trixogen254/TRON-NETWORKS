import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = 'https://tron-networks-6ij712yve-trixogen254s-projects.vercel.app';
  

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/packages`);
        setPackages(response.data);
      } catch (error) {
        setError('Failed to fetch packages: ' + error.message);
      }
    };

    fetchPackages();
  }, []);

  const handlePurchase = (packageId) => {
    navigate('/pay', { state: { packageId } });
  };

  return (
    <div id="app">
      <h2>Select a Package</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="package-grid">
        {packages.map(pkg => (
          <div key={pkg.id} className="package-card">
            <h3>{pkg.name}</h3>
            <p>Ksh. {pkg.price}</p>
            <p>{pkg.description}</p>
            <button onClick={() => handlePurchase(pkg.id)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
