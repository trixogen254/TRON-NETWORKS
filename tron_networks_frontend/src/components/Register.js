import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const API_URL = 'https://tron-networks-qyqik2hve-trixogen254s-projects.vercel.app'; // Base URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password, email, phone });
      alert(response.data);
      navigate('/login'); // Navigate to login after successful registration
    } catch (error) {
      alert('Registration failed: ' + error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')}>Already have an account? Login</button>
    </div>
  );
}

export default Register;


