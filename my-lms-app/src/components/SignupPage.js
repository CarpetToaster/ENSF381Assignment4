import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthMessage from './AuthMessage';
import Header from './Header';
import Footer from './Footer';
import './styles.css';

export const AuthContextSignup = createContext();

const RegFormFunction = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;

    if (!usernameRegex.test(formData.username)) {
      return "Invalid username. Use 3–20 characters, start with a letter.";
    }
    if (!passwordRegex.test(formData.password)) {
      return "Password must be 8+ chars, with upper/lower/number/special.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    if (!emailRegex.test(formData.email)) {
      return "Invalid email format.";
    }
    return null;
  };

  const handleSignup = async () => {
    const validationError = validateInput();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Signup successful! Redirecting...' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Registration failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'API error. Try again later.' });
    }
  };

  return (
    <AuthContextSignup.Provider value={{ status }}>
    <main className="main_login" id="signupArea">
      <h2>LMS Signup</h2>
      <form>
        <div className="form">
          <label htmlFor="username">Username:</label>
          <input
            className="input_field"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br /><br />
  
          <label htmlFor="password">Password:</label>
          <input
            className="input_field"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br /><br />
  
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="input_field"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <br /><br />
  
          <label htmlFor="email">Email:</label>
          <input
            className="input_field"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br /><br />
        </div>
  
        <div className="buttons">
          <button
            className="signup_button"
            type="button"
            id="signupButton"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
  
        <a href="/login">Already have an account? Login</a>
  
        <AuthMessage />
      </form>
    </main>
    </AuthContextSignup.Provider>
  );
}

function RegForm() {
    return (
      <div>
        <Header />
        <RegFormFunction />
        <Footer />
      </div>
    );
  }

export default RegForm;