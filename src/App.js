import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import IslandSection from './IslandSection';
import ScooterStats from './ScooterStats';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<IslandSection />} />
          <Route path="/investments" element={<ScooterStats />} />
  
        </Routes>
      </div>
    </Router>
  );
};

export default App;