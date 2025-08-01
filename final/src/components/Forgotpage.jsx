import React, { useState } from 'react';
import './Forgotpage.css';
import { handleError, handleSuccess } from './utils'; // ✅ Make sure this exists
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

function ForgotPage() {



  useEffect(() => {
    document.title = "Forgot Password - Brofessor";
  }, []);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) return handleError('Please enter your email.');

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        handleSuccess(data.message || 'Reset link sent to your email.');
        setEmail('');
      } else {
        handleError(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      console.error(err);
      handleError('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      < div className='image-side'>
        <img src="/img3.jpg" alt="Background" className="image" />
      </div>
     
      <div className="forgot-content">
        <div className="broffesor-logo">
          <img src="/broffesor-logo.png" alt="Logo" className="broffeser-logo" />
        </div>

        <h3>Forgot Password</h3>
        <p>Please enter your registered email address to reset your password.</p>
        <form className="forgot-form" onSubmit={handleForgotPassword}>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPage;
    