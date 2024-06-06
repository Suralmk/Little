import React from 'react'
import '../style.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { side_bg, side_bg2 } from '../../assets/index'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'

import api from '../../Config/config'

const Signup = ({}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmaiError] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const SubmitSignup = async e => {
    e.preventDefault()
    if (validateSignup() === false) {
      return
    } else {
      try {
        const response = await api()
          .post('register/', {
            email: email,
            username: username,
            password: password
          })
          .then(() => {
            navigate('/login')
          })
      } catch (err) {
        console.log(err.respo)
      }
    }
  }
  const validateSignup = () => {
    const failPassword = !password || password.length < 3
    if (failPassword) {
      setPasswordError('Password is required!')
    } else {
      setPasswordError('')
    }

    const failemail = !email || email.length === 0
    if (failemail) {
      setEmaiError('Email is required')
    } else {
      setEmaiError('')
    }

    const failusername = !username || username.length === 0
    if (failusername) {
      setUsernameError('Username is required!!')
    } else {
      setUsernameError('')
    }

    if (failPassword || failusername || failemail) {
      return false
    }
  }
  return (
    <div className='auth-form  d_flex'>
      <div className='auth-form-container'>
        <div className='side_bg'>
          <img src={side_bg2} alt='' />
        </div>
        <form onSubmit={e => SubmitSignup(e)}>
          <h1>Sign Up</h1>
          <div className='input-field'>
            <label htmlFor='email'>EMAIL</label>
            <input
              style={
                emailError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='email'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {emailError ? <p className='error-message'>{emailError}</p> : ''}
          </div>
          <div className='input-field'>
            <label htmlFor='username'>username</label>
            <input
              style={
                usernameError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='text'
              name='username'
              placeholder='Enter username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {usernameError ? (
              <p className='error-message'>{usernameError}</p>
            ) : (
              ''
            )}
          </div>
          <div className='input-field'>
            <label htmlFor='password'>PASSWORD</label>
            <input
              style={
                passwordError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='password'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {passwordError ? (
              <p className='error-message'>{passwordError}</p>
            ) : (
              ''
            )}
          </div>
          <button type='submit'>Sign Up</button>
          <div class='or-container'>
            <span class='or-text'>or</span>
          </div>
          <button type='submit' style={{ marginTop: '0px' }}>
            <FaGoogle /> Sign Up with Google
          </button>
          <div>
            <p>
              Already have an account?{' '}
              <Link to='/login' style={{ color: 'rgb(5, 5, 143)' }}>
                Log In
              </Link>
            </p>
            <p>
              <Link to='/register' style={{ color: 'rgb(5, 5, 143)' }}>
                Terms and Conditions
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
