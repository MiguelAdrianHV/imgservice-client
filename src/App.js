// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ImageUpload from './components/ImageUpload/ImageUpload';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<ImageUpload/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;