import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthMessage from './AuthMessage';
import Header from './Header';
import Footer from './Footer';
import './styles.css';

export const AuthContextLogin = createContext();

const LoginFormFunction = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setStatus({ type: 'error', message: 'Fields cannot be empty.' });
      return;
    }

    if (password.length < 8) {
      setStatus({ type: 'error', message: 'Password must be at least 8 characters.' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => {
          localStorage.setItem("studentId", result.student_id)
          navigate('/courses');
        }, 2000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Login failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'API error. Try again later.' });
    }
  };

  return (
    <AuthContextLogin.Provider value={{ status }}>
      <main className="main_login" id="loginArea">
        <h2>LMS Login</h2>
        <form>
          <div className="form">
            <label htmlFor="username">Username:</label>
            <input className="input_field" type="text" id="username" name="username" value={username}
              onChange={(e) => setUsername(e.target.value)}
              required />
            <br /><br />

            <label htmlFor="password">Password:</label>
            <input className="input_field" type="password" id="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            <br /><br />
          </div>

          <div className="buttons">
            <button className="button_login" type="button" id="submitButton" onClick={handleLogin}>
              Login
            </button>
          </div>

          <a href="#">Forgot Password?</a><br />
          <a href="Register">Don't have an account? Sign up</a>

          <AuthMessage />
        </form>
      </main>
    </AuthContextLogin.Provider>
  );
};

function LoginForm() {
    return (
      <div>
        <Header />
        <LoginFormFunction />
        <Footer />
      </div>
    );
  }

export default LoginForm;