import React, { useState, useEffect } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../components/utils';

const Signup = () => {
  const [signupinfo, setsignupInfo] = useState({
    name: '',
    emailid: '',
    Phonenumber: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signup - Brofessor";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setsignupInfo({ ...signupinfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... (keep your existing signup logic)
  };

  return (
    <div className="signup-page-container">
      <div className="signup-content-container">
        {/* Form Section */}
        <div className="signup-form-section">
          <div className="form-header"><img src="/broffesor-logo.png" alt="Logo" className="logo" />
            <h2>Create Account</h2>
            <p>Join our learning community today</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="form-row">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={signupinfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="emailid"
                  value={signupinfo.emailid}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="Phonenumber"
                  value={signupinfo.Phonenumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Department</label>
                <select
                  name="department"
                  value={signupinfo.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  <option value="cse">CSE (Computer Science Engineering)</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="ds">Data Science</option>
                  <option value="it">Information Technology</option>
                  <option value="ml">Machine Learning</option>
                  <option value="bca">BCA / MCA (Computer Applications) </option>
                  <option value="bsc">B.Sc / M.Sc Computer Science</option>
                  <option value="mac">Mathematics and Computing (IITs/NITs)</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupinfo.password}
                  onChange={handleInputChange}
                  placeholder="Create password"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={signupinfo.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>

        {/* GIF Section */}
        <div className="signup-visual-section">
          <div className="visual-content">
            <img 
              src="/welcome.gif" 
              alt="Welcome Animation" 
              className="welcome-animation"
            />
            <div className="welcome-message">
              <h3>Start Your Learning Journey</h3>
              <p><span className='wave-emoji'>🎲</span>New Player Detected – Hit Register to Enter Arena!</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
