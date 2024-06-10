import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CSS/Signup.css'
import eyeIcon from '../Components/Assets/open_eye.png'
import eye_slashIcon from '../Components/Assets/closed_eye.png'

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='signup'>
      <div className="signup-container">
        <h1>Sign up</h1>
        <div className="signup-fields">
          <input type="text" placeholder='Your Name'/>
          <p>Select Your Role</p>
          <select name='role' className='signup-role'>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Distributor">Distributor</option>
            <option value="Delivery">Delivery</option>
          </select>
          <input type="email" placeholder='Email Address'/>
          <div className="password-container">
            <input type={showPassword ? "text" : "password"} placeholder='Password'/>
            <img src={showPassword ? eyeIcon : eye_slashIcon} alt="Toggle Password Visibility" className='toggle-password-visibility' onClick={togglePasswordVisibility}/> 
          </div>
          <div className="password-container">
            <input type={showPassword ? "text" : "confirmpassword"} placeholder='Confirm Password'/>
            <img src={showPassword ? eyeIcon : eye_slashIcon} alt="Toggle Password Visibility" className='toggle-password-visibility' onClick={togglePasswordVisibility}/>
          </div>
          
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Already have an account? <Link to="/login"><span>Login here</span></Link></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy</p>
        </div>
      </div>
    </div>
  )
}
