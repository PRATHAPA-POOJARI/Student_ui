// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './pages/AuthContext';
import './App.css';  // Importing the updated CSS

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
