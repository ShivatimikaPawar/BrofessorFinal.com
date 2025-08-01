import './LoginSignup.css';
import Login from '../login/Login';
import Signup from '../Signup/Signup';
import ForgotPage from '../components/Forgotpage';
import Home from './Home';
import Notfound from '../components/Notfound';
import ResetPassword from '../components/resetPassword';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />} /> {/* notice no "/" */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot" element={<ForgotPage />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

function LoginSignup() {
  return (
    <GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
      <div className="LoginSignup">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginSignup;

