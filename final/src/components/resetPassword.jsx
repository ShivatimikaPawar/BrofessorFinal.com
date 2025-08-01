import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './resetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("❌ Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:8080/auth/reset-password/${token}`, {
                newPassword,
                confirmPassword,
            });

            setMessage(res.data.message);

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            console.error(err);
            setMessage("❌ Error resetting password.");
        }
    };

    return (
        <div className="forgot-container">
            <div className="image-side">
                <img src="/img3.jpg" alt="Reset Visual" className="image" />
            </div>

            <div className="forgot-content">
                <div class="broffesor-logo">
                    <img src="/broffesor-logo.png" alt="Logo" class="broffeser-logo" />
                </div>

                <h3>Reset Password</h3>
                <p>Please enter your new password below.</p>

                <form className="forgot-form" onSubmit={handleReset}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="forgot-btn">Reset Password</button>
                </form>

                {message && <p style={{ marginTop: '20px' }}>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
