import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginSuccess } from '../../../store/authSlice';
import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import '../components/Auth.css';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we are on the /register route to default to Sign Up view
    useEffect(() => {
        if (location.pathname === '/register') {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }
    }, [location.pathname]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Login Logic
        console.log('Logging in with:', formData.email, formData.password);
        const mockUser = { name: 'User', email: formData.email, role: 'user' };
        dispatch(loginSuccess({ user: mockUser, token: 'mock-token' }));
        navigate('/');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Mock Register Logic
        console.log('Registering with:', formData);
        const mockUser = { name: formData.name, email: formData.email, role: 'user' };
        dispatch(loginSuccess({ user: mockUser, token: 'mock-token' }));
        navigate('/');
    };

    return (
        <div className="auth-container-wrapper">
            <div className={`container-auth ${isSignUp ? "right-panel-active" : ""}`} id="container">
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social"><FaGoogle /></a>
                            <a href="#" className="social"><FaLinkedinIn /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Sign Up</button>
                        <button type="button" className="mobile-toggle-btn" onClick={() => setIsSignUp(false)}>
                            Already have an account? Sign In
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social"><FaGoogle /></a>
                            <a href="#" className="social"><FaLinkedinIn /></a>
                        </div>
                        <span>or use your account</span>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <a href="#">Forgot your password?</a>
                        <button type="submit">Sign In</button>
                        <button type="button" className="mobile-toggle-btn" onClick={() => setIsSignUp(true)}>
                            Don't have an account? Sign Up
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => {
                                    setIsSignUp(false);
                                    navigate('/login');
                                }}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={() => {
                                    setIsSignUp(true);
                                    navigate('/register');
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
