import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotesPage from './pages/SimpleNotes';
import LoginSignup from './pages/LoginSignup';
import Signup from './Signup/Signup';
import Login from './login/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Planner from './pages/Planner';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SimpleNotes" element={<NotesPage />} />
        <Route path="/LoginSignup/*" element={<LoginSignup />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/signup" element={
          <>
          <Navbar />
          <Signup />
          <Footer />
          </>
        } />

        <Route path="/login" element={
          <>
          <Navbar />
          <Login />
          <Footer />
          </>
        } />

        <Route path="/Planner/*" element={<Planner />} />

        {/* Add more routes here later */}
      </Routes>
  );
}

export default App;
