import React, { useState, useEffect } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../components/utils';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [logininfo, setloginInfo] = useState({
    identifier: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - Brofessor";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setloginInfo({ ...logininfo, [name]: value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = logininfo;

    if (!identifier || !password) {
      return handleError('Please fill all the fields');
    }

    if (
      identifier &&
      !/^\d{10}$/.test(identifier) &&
      !/\S+@\S+\.\S+/.test(identifier)
    ) {
      return handleError('Please enter a valid phone number or email');
    }

    if (password.length < 4) {
      return handleError('Password must be at least 4 characters long');
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logininfo),
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        const errorData = contentType?.includes('application/json')
          ? await response.json()
          : await response.text();

        return handleError(errorData.message || 'Login failed');
      }

      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (success) {
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('loggedInUser', name);
        handleSuccess(message);
        setTimeout(() => navigate('/Home'), 1000);
      } else {
        handleError(message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      handleError('Something went wrong. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch('http://localhost:8080/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('jwtToken', data.jwtToken);
        localStorage.setItem('loggedInUser', data.name);
        handleSuccess('Google login successful');
        navigate('/Home');
      } else {
        handleError(data.message || 'Google login failed');
      }
    } catch (err) {
      handleError('Google login failed');
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">

          <div className="form-wrapper">
            <h2>Welcome Back!</h2>
            <p className="subtitle">Login to continue your journey</p>

            <form className="login-form" onSubmit={handlelogin}>
              <div className="form-group">
                <label htmlFor="identifier">Email or Phone</label>
                <input
                  type="text"
                  name="identifier"
                  id="identifier"
                  placeholder="Enter your email or phone"
                  value={logininfo.identifier}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={logininfo.password}
                  onChange={handleInputChange}
                />
                <div className="forgot-password">
                  <Link to="/Forgot">Forgot Password?</Link>
                </div>
              </div>

              <button type="submit" className="login-button">Login</button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="google-login">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => handleError('Google login failed')}
                theme="filled_blue"
                size="large"
                text="continue_with"
              />
            </div>

            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>

        <div className="gif-container">
          <img src="/welcome.gif" alt="Welcome animation" className="welcome-gif" />
          <div className="welcome-text">
            <h1>Let's Get Started!</h1>
            <p><span className='wave-emoji'>😎</span>Yo, You Wanna Get Placed or Nah?</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Login;