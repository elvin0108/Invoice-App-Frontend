import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../invoice.png'; // Assuming you have a PNG image in your project

const messages = [
    'Create Invoice',
    'Manage Invoices',
    'Manage Products',
    'Manage Customers',
    'Download Invoices',
    'Send Invoices to WhatsApp',
    'Analytics Dashboard',
    'Download CSV Reports',
    '24 * 7 Customer Supports'
];

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentMessage, setCurrentMessage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('https://dkengineering-backend.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            console.error('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h1 className="welcome-message">{messages[currentMessage]}</h1>
            <div className="login-form-container">
                <div className="login-content">
                    <div className="login-image-container">
                        <img src={welcomeImage} alt="Welcome" className="login-image" />
                    </div>
                    <div className='login-form-box'>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="login-input"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="login-input"
                        />
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
