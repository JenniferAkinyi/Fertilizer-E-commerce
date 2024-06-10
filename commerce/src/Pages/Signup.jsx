import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/Signup.css'

export const Signup = () => {
  return (
    <div className='signup'>
      <div className="signup-container">
        <h1>Sign up</h1>
        <div className="signup-fields">
          <input type="text" placeholder='Your Name'/>
          <input type="email" placeholder='Email Address'/>
          <input type="password" placeholder='Password'/>
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
