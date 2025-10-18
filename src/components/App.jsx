import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from './Navbar';
import Setup from '../pages/Dashboard';
import Home from '../pages/HomePage';
import Forecast from '../pages/Forecast';
import About from '../pages/About';


function App(){
  return(
    <Router>
      <div className="h-screen bg-gray-50 text-gray-500">
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Setup /> } />
          <Route path="/home" element={<Home />} />
          <Route path="/forecast" element={<Forecast /> } />
          <Route path="/about" element={<About /> } />
          
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;