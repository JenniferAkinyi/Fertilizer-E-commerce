import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Ensure you import db from your firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './CSS/Signup.css';
import eyeIcon from '../Components/Assets/open_eye.png';
import eye_slashIcon from '../Components/Assets/closed_eye.png';

export const Signup = () => {
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('User'); // Default role
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a new user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email: user.email,
        role
      });

      setSuccess('Sign up successful');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className='signup'>
      <div className="signup-container">
        <h1>Sign up</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSignup}>
          <div className="signup-fields">
            <input
              type="text"
              placeholder='Your Name'
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <p>Select Your Role</p>
            <select
              name='role'
              className='signup-role'
              autoComplete="off"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Distributor">Distributor</option>
              <option value="Delivery">Delivery</option>
            </select>
            <input
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <img
                src={showPassword ? eyeIcon : eye_slashIcon}
                alt="Toggle Password Visibility"
                className='toggle-password-visibility'
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <img
                src={showPassword ? eyeIcon : eye_slashIcon}
                alt="Toggle Password Visibility"
                className='toggle-password-visibility'
                onClick={togglePasswordVisibility}
              />
            </div>
            
          </div>
          <button type='submit'>Continue</button>
        </form>
        <p className='loginsignup-login'>
          Already have an account? <Link to="/login"><span>Login here</span></Link>
        </p>
      </div>
    </div>
  );
};
