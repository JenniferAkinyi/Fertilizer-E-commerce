import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import './CSS/Login.css'
import eyeIcon from '../Components/Assets/open_eye.png'
import eye_slashIcon from '../Components/Assets/closed_eye.png'


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='login'>
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-fields">
                <input type="email" placeholder='Email Address'/>
                <div className="password-container">
                  <input type={showPassword ? "text" : "password"} placeholder='Password'/>
                  <img src={showPassword ? eyeIcon : eye_slashIcon} alt="Toggle Password Visibility" className='toggle-password-visibility' onClick={togglePasswordVisibility}/> 
                </div>
            </div>
            <button>Continue</button>
            <p className='loginsignup-login'>Don't have an account? <Link to="/signup"><span>Signup here</span></Link></p>
        </div>
    </div>
  )
}
