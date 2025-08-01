import React from 'react';
import './LoginButton.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginButton() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Login Success:", tokenResponse);

      try {
        // Fetch user info from Google using the access token
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        console.log("Google User Info:", res.data);
        // Optional: send this info to your backend for account creation/session

      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <div className="Login">
      <div className="login-container">
        <button 
          className="login-btn" 
          onClick={login}
          aria-label="Login with Google"
        >
          <img src="./Guglo.png" alt="Google" className="google-icon" />
          <span className="login-text">Login</span>
        </button>
      </div>
    </div>
  );
}

export default LoginButton;
