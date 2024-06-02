import React, { useState, useEffect } from 'react';
import welcomeImage from '../invoice.png'; // Assuming you have a PNG image in your project
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('https://dkengineering-backend.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            toast.success('User Registered Successfully', {
              position: toast.POSITION.TOP_RIGHT,
            });
        } else {
          toast.error('Error in user registration', {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.error('Registration failed');
        }
    };

    return (
        <div className="login-container">
          <ToastContainer />
            <h1 className="welcome-message">{messages[currentMessage]}</h1>
            <div className="login-form-container">
                <div className="login-content">
                    <div className="login-image-container">
                        <img src={welcomeImage} alt="Welcome" className="login-image" />
                    </div>
                    <div className='login-form-box'>
                    <h1>Register New User</h1>
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
                        <button type="submit" className="login-button">Register</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
