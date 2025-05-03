import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Diagnosis } from './pages/Diagnosis';
import { Login } from './pages/Login';
import { FAQ } from './pages/FAQ';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}