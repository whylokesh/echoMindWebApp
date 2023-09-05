import React, { useState, useRef } from 'react';
import 'boxicons';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const LoginCard = () => {
    const loginContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '75vh',
    };

    const loginCardStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        border: '3px solid transparent',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
        position: 'relative',
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
    };

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toastRef = useRef(null);

    const handleLogin = async (event) => {
        event.preventDefault();

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
                console.log('Token:', responseData.token);
                console.log('response data', responseData);

                localStorage.setItem('token', responseData.token);

               let toast;

                navigate('/table');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);

            toastRef.current.show({
                severity: 'error',
                summary: 'error',
                detail: 'Login failed. Please check your credentials.',
            });
        }
    };

    return (
        <>
            <Navbar />
            <div style={loginContainerStyle}>
                <div style={loginCardStyle}>
                    <i className='bx bx-user' style={iconStyle}></i>
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
            <div className="card flex justify-content-center">
                <Toast ref={toastRef} />
                {/* <Button onClick={show} label="Show" /> */}
            </div>  
        </>
    );
};

export default LoginCard;
