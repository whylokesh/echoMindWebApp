import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Table from './components/Table';

// PRIME REACT
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
function App() {
  const isUserLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/table"
            element={isUserLoggedIn ? <Table /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
