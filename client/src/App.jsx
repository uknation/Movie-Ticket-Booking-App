// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      
      <Route path="/protected" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
};



export default App;
