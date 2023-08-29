import React from 'react';
import 'boxicons';
import { useState } from 'react';
import Navbar from './Navbar';

const LoginCard = () => {
    const loginContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '75vh',
        // background: 'linear-gradient(to right, #c31432, #240b36)',
    };

    const loginCardStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        border: '3px solid transparent', // Initially transparent border
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
        position: 'relative', // For icon positioning
    };

    const iconStyle = {
        fontSize: '36px',
        marginBottom: '15px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#f3f3f3',
    };

    const submitButtonStyle = {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        color: 'white',
        cursor: 'pointer',
        animation: 'colorChange 2s infinite alternate', // Keyframes animation
    };

    const keyframesStyle = `
    @keyframes colorChange {
      from {
        background: linear-gradient(to right, #ff416c, #ff4b2b);
      }
      to {
        background: linear-gradient(to right, #ff4b2b, #ff416c);
      }
    }
  `;

 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        // Create an object to hold login data
        const loginData = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3000/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Handle successful login here
                setLoginMessage('Login successful');
                console.log('Unique ID:', responseData.unique_id);
        
                localStorage.setItem('unique_id', responseData.unique_id);
        
                // Call the onLogin callback to update isLoggedIn in App.js
                
              } else {
                // Handle login error here
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <Navbar />
            <div style={loginContainerStyle}>
                <style>{keyframesStyle}</style>
                <div style={loginCardStyle}>
                    <i className='bx bx-user' style={{ fontSize: '36px', marginBottom: '15px' }}></i>
                    <h2 className='mb-4'>Login</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                        <button style={submitButtonStyle} onClick={handleLogin}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginCard;