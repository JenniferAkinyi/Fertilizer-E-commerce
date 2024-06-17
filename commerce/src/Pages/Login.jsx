// Login.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './CSS/Login.css';
import eyeIcon from '../Components/Assets/open_eye.png';
import eye_slashIcon from '../Components/Assets/closed_eye.png';
import { UserContext } from '../Context/UserContext';


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useContext(UserContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      // Fetch user role from database (e.g., Firestore)
  
      login({ email: user.email, displayName: user.displayName || user.email.split('@')[0], role: user });
      if (user === 'admin') {
        navigate('/dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/'); // Redirect to shop page
      }
    } catch (error) {
      console.error(error.message);
      if (error.code === 'auth/invalid-email') {
        setEmailError('Invalid email address');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password');
      } else if (error.code === 'auth/user-not-found') {
        setEmailError('No user found with this email');
      } else {
        setEmailError('Error logging in');
      }
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="login-fields">
            <input 
              type="email" 
              placeholder='Email Address' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <div className="password-container">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <img 
                src={showPassword ? eyeIcon : eye_slashIcon} 
                alt="Toggle Password Visibility" 
                className='toggle-password-visibility' 
                onClick={togglePasswordVisibility} 
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type='submit'>Continue</button>
          <p>Forgot Password</p>
        </form>
        <p className='loginsignup-login'>
          Don't have an account? <Link to="/signup"><span>Signup here</span></Link>
        </p>
      </div>
    </div>
  );
};
