import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Packages from './components/Packages';
import Pay from './components/Pay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/pay" element={<Pay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
