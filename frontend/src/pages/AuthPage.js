import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'STUDENT'
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  // Password strength checker
  useEffect(() => {
    if (formData.password.length === 0) {
      setPasswordStrength('');
      return;
    }
    
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[a-z]/.test(formData.password)) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    
    if (strength <= 2) setPasswordStrength('Weak');
    else if (strength <= 3) setPasswordStrength('Medium');
    else setPasswordStrength('Strong');
  }, [formData.password]);

  // Password match checker
  useEffect(() => {
    if (!isLogin) {
      setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === '');
    }
  }, [formData.password, formData.confirmPassword, isLogin]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await login({
          usernameOrEmail: formData.username,
          password: formData.password
        });
        // navigate('/dashboard'); // Remove navigation, let context handle it
      } else {
        // Register
        if (!passwordMatch) {
          toast.error('Passwords do not match!');
          return;
        }
        if (passwordStrength === 'Weak') {
          toast.error('Please use a stronger password!');
          return;
        }

        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role
        });
        // navigate('/dashboard'); // Remove navigation, let context handle it
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      role: 'STUDENT'
    });
  };

  return (
    <div className="auth-page">
      {/* Compact Navbar */}
      <nav className="auth-navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <i className="fas fa-brain"></i>
            QWIZZ
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Compact Auth Container */}
      <div className="auth-container compact">
        <div className="auth-card compact">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form compact">
            <h2 className="auth-title">
              {isLogin ? 'Welcome Back!' : 'Join QWIZZ'}
            </h2>
            <p className="auth-subtitle">
              {isLogin
                ? 'Sign in to your account'
                : 'Create your account to get started'
              }
            </p>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
            )}

            {!isLogin && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="form-input"
                    placeholder="First name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="form-input"
                    placeholder="Last name"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Password"
              />
              {!isLogin && formData.password && (
                <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                  <span className="strength-text">Strength: {passwordStrength}</span>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className={`form-input ${!passwordMatch ? 'error' : ''}`}
                  placeholder="Confirm password"
                />
                {!passwordMatch && formData.confirmPassword && (
                  <span className="error-text">Passwords don't match</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || (!isLogin && !passwordMatch)}
              className="auth-submit-btn"
            >
              {loading ? (
                <>
                  <div className="spinner small"></div>
                  {isLogin ? 'Signing In...' : 'Creating...'}
                </>
              ) : (
                <>
                  <i className={`fas fa-${isLogin ? 'sign-in-alt' : 'user-plus'}`}></i>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>

            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="auth-toggle-btn"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;