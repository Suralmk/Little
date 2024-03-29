import React from 'react'
import '../style.css'

import { Link } from 'react-router-dom'
import { useState, useReducer } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { side_bg2 } from '../../assets'
import { FaGoogle } from 'react-icons/fa'
import api from '../../Config/config'

const Login = ({ setIsAuthenticated, HomeUpdate }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmaiError] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const navigate = useNavigate()
  const submitLogin = async e => {
    e.preventDefault()

    if (validateLogin() == false) {
      return
    } else {
      try {
        const reponse = await api.post('login/', {
          email: email,
          password: password
        })
        const username = reponse.data['username']
        localStorage.setItem('username', username)
        setIsAuthenticated(true)
        navigate('/')
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const validateLogin = () => {
    const failEmail = !email || email.length === 0
    if (failEmail) {
      setEmaiError('Email is required!')
    } else {
      setEmaiError('')
    }

    const failPassword = !password || password.length < 2
    if (failPassword) {
      setPasswordError('Password is required!')
    } else {
      setPasswordError('')
    }

    if (failPassword || failEmail) {
      return false
    }
  }
  return (
    <div className='auth-form  d_flex'>
      <div className='auth-form-container'>
        <div className='side_bg'>
          <img src={side_bg2} alt='' />
        </div>
        <form action='/' onSubmit={e => submitLogin(e)} className=''>
          <h1>Log In</h1>
          <div className='input-field '>
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
          <div className='input-field '>
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
          <p>
            <Link to='/reset-password' style={{ color: 'rgb(5, 5, 143)' }}>
              Forgot Password?
            </Link>
          </p>
          <button type='submit'>Log In</button>
          <button type='submit' style={{ marginTop: '0px' }}>
            <FaGoogle /> Log In with Google
          </button>

          <p>
            Doesn't have an account?{' '}
            <Link to='/register' style={{ color: 'rgb(5, 5, 143)' }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
