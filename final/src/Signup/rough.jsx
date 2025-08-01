import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';

const Signup = () => {
    const [signupinfo, setsignupInfo] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setsignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, phone, department, password, confirmPassword } = signupinfo;

        if (!name || !email || !phone || !department || !password || !confirmPassword) {
            return handleError('Please fill all the fields');
        }

        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }

        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupinfo),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            handleError(error.message || 'Signup failed');
        }

        // Clear form
        setsignupInfo({
            name: '',
            email: '',
            phone: '',
            department: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="container">
            <div className="logo">
                <h2>Brofessor.com</h2>
            </div>

            <div className='adduser'>
                <h3>Sign Up</h3>
                <form className='adduser-form' onSubmit={handleSignup}>
                    <div className='inputgroup'>

                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' autoComplete='off' placeholder='Full name' onChange={handleInputChange} value={signupinfo.name} />

                        <label htmlFor='email'>Email ID</label>
                        <input type='email' id='email' name='email' autoComplete='off' placeholder='Email ID' onChange={handleInputChange} value={signupinfo.email} />

                        <label htmlFor='phone'>Phone Number</label>
                        <input type='tel' id='phone' name='phone' autoComplete='off' placeholder='Phone number' onChange={handleInputChange} value={signupinfo.phone} />

                        <label htmlFor='department'>Department</label>
                        <select
                            id='department'
                            name='department'
                            value={signupinfo.department}
                            onChange={handleInputChange}
                            className='form-select'
                        >
                            <option value="">-- Select Department --</option>
                            <option value="cse">Computer Science</option>
                            <option value="ece">Electronics</option>
                            <option value="mech">Mechanical</option>
                            <option value="civil">Civil</option>
                            <option value="bio">Electrical</option>
                        </select>

                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' autoComplete='off' placeholder='Password' onChange={handleInputChange} value={signupinfo.password} />

                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' id='confirmPassword' name='confirmPassword' autoComplete='off' placeholder='Confirm password' onChange={handleInputChange} value={signupinfo.confirmPassword} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button type='submit' className="sign up-btn">
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className='login-link'>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
