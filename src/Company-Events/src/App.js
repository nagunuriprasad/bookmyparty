import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catering from './pages/Catering';
import Venues from './pages/Venues';
import Decoration from './pages/Decoration';
import PhotoVideo from './pages/PhotoVideo';
import DJLights from './pages/DJLights';
import Entertainment from './pages/Entertainment';
import Others from './pages/Others';
import Navigation from './Navigation';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/catering" element={<Catering />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/decoration" element={<Decoration />} />
          <Route path="/photo-video" element={<PhotoVideo />} />
          <Route path="/dj-lights" element={<DJLights />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/others" element={<Others />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
