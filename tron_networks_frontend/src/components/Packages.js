import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure you import the CSS

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/packages');
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
          <div key={pkg.id} className="package-box">
            <div className="package-title">{pkg.name}</div>
            <div className="package-description">{pkg.description}</div>
            <div className="package-price">KSH{pkg.price}</div>
            <button onClick={() => handlePurchase(pkg.id)}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
