import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Pagenotfound from './pages/Pagenotfound';
import Header from './components/Layout/Header';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect routes with ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
          </Route>

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
