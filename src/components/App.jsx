import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';
import Navbar from './Navbar';
import Forecast from '../pages/Forecast';

function App(){
  return(
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/search" element={<div>Search page coming soon....</div>} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;