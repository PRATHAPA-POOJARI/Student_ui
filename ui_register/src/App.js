import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Pagenotfound from './pages/Pagenotfound';
import Header from './components/Layout/Header';
import Register  from'./pages/Register';
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Include the Header in the app so it's visible on all pages */}
        <Header />

        <Routes>
          {/* Default route should be Home */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* For any undefined route, show PageNotFound */}
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
