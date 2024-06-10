import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/Login.css'

export const Login = () => {
  return (
    <div className='login'>
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-fields">
                <input type="email" placeholder='Email Address'/>
                <input type="password" placeholder='Password'/>
            </div>
            <button>Continue</button>
            <p className='loginsignup-login'>Don't have an account? <Link to="/signup"><span>Signup here</span></Link></p>
        </div>
    </div>
  )
}
