import React, { useState } from 'react'
import '../style.css'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import useGlobal from '../../Core/global'
import { api } from '../../Core/config'
import { side_bg2 } from '../../assets/index'

const Signup = () => {
  const login = useGlobal(state => state.login)
  const addToast = useGlobal(state => state.addToast)
  const setLoading = useGlobal(state => state.setLoading)
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmaiError] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async e => {
    e.preventDefault()

    if (!validateSignup()) return

    setLoading(true)
    try {
      const res = await api.post('register/', userInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 201) {
        addToast('Successfully Registered!', 'success')
        login(res.data)
        navigate('/')
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        addToast(`${err.response.data.error}`, 'failure')
      } else {
        addToast(`An error occurred: ${err.message}`, 'failure')
      }
    }
    setLoading(false)
  }

  const validateSignup = () => {
    let isValid = true

    if (!userInfo.email) {
      setEmaiError('Email is required')
      isValid = false
    } else {
      setEmaiError('')
    }

    if (!userInfo.username) {
      setUsernameError('Username is required')
      isValid = false
    } else {
      setUsernameError('')
    }

    if (!userInfo.password || userInfo.password.length < 3) {
      setPasswordError('Password must be at least 3 characters long')
      isValid = false
    } else {
      setPasswordError('')
    }

    return isValid
  }

  const handleGoogle = async response => {
    setLoading(true)
    const { credential } = response
    try {
      const res = await api.post('google-login/', { code: credential })
      login(res.data)
      navigate('/')
      addToast('Successfully Logged In with Google!', 'success')
    } catch (err) {
      addToast(`Google login failed: ${err.message}`, 'failure')
    }
    setLoading(false)
  }

  const handleLoginFailure = () => {
    addToast('Google Login Failed', 'failure')
  }

  return (
    <div className='auth-form d_flex'>
      <div className='auth-form-container'>
        <div className='side_bg'>
          <img src={side_bg2} alt='Background' />
        </div>
        <form onSubmit={handleRegister}>
          <h1>Sign Up</h1>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input
              style={
                emailError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='email'
              name='email'
              placeholder='Enter email'
              value={userInfo.email}
              onChange={handleChange}
            />
            {emailError && <p className='error-message'>{emailError}</p>}
          </div>

          <div className='input-field'>
            <label htmlFor='username'>Username</label>
            <input
              style={
                usernameError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='text'
              name='username'
              placeholder='Enter username'
              value={userInfo.username}
              onChange={handleChange}
            />
            {usernameError && <p className='error-message'>{usernameError}</p>}
          </div>

          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input
              style={
                passwordError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='password'
              name='password'
              placeholder='Enter password'
              value={userInfo.password}
              onChange={handleChange}
            />
            {passwordError && <p className='error-message'>{passwordError}</p>}
          </div>

          <button type='submit'>Sign Up</button>

          <div className='or-container'>
            <span className='or-text'>or</span>
          </div>

          <GoogleOAuthProvider clientId='788776495482-jgidauvaegmcslr5rif3u7l38ttc7q1b.apps.googleusercontent.com'>
            <GoogleLogin
              width={'350'}
              onSuccess={handleGoogle}
              onError={handleLoginFailure}
              flow='auth-code'
            />
          </GoogleOAuthProvider>

          <div>
            <p>
              Already have an account?{' '}
              <Link to='/login' style={{ color: 'rgb(5, 5, 143)' }}>
                Log In
              </Link>
            </p>
            <p>
              <Link to='/terms' style={{ color: 'rgb(5, 5, 143)' }}>
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
