// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CollectionsPage from './pages/CollectionPage';
import ListCollection from './pages/ListCollection'; 
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
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:databaseName" element={<ListCollection />} />
          <Route path="/collections/:databaseName/:collectionName" element={<CollectionsPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
