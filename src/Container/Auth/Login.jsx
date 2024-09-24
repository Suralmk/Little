import React, { useState } from 'react'
import '../style.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../Core/config'
import useGlobal from '../../Core/global'

const Login = () => {
  const login = useGlobal(state => state.login)
  const addToast = useGlobal(state => state.addToast)
  const setLoading = useGlobal(state => state.setLoading)
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async event => {
    event.preventDefault()

    if (!validateLogin()) {
      return
    }

    setLoading(true)
    try {
      const res = await api.post('login/', userInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        login(res.data)
        navigate('/')
      }
    } catch (err) {
      if (err.response) {
        addToast(`${err.response.data.detail}`, 'failure')
      } else {
        addToast(`There is a ${err.message}!`, 'failure')
      }
    }
    setLoading(false)
  }

  const validateLogin = () => {
    const failEmail = !userInfo.email || userInfo.email.length === 0
    if (failEmail) {
      setEmailError('Email is required!')
    } else {
      setEmailError('')
    }

    const failPassword = !userInfo.password || userInfo.password.length < 2
    if (failPassword) {
      setPasswordError('Password is required!')
    } else {
      setPasswordError('')
    }

    return !(failPassword || failEmail)
  }

  const handleGoogle = async response => {
    setLoading(true)
    const { credential } = response

    try {
      const res = await api.post('google-login/', {
        code: credential
      })

      login(res.data)
      navigate('/')
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
        <form>
          <h1>Log In</h1>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input
              style={
                emailError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={handleChange}
              value={userInfo.email}
            />
            {emailError && <p className='error-message'>{emailError}</p>}
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
              onChange={handleChange}
              value={userInfo.password}
            />
            {passwordError && <p className='error-message'>{passwordError}</p>}
          </div>
          <p>
            <Link to='/reset-password' style={{ color: 'rgb(5, 5, 143)' }}>
              Forgot Password?
            </Link>
          </p>
          <button
            type='submit'
            onClick={handleLogin}
            disabled={
              !userInfo.email ||
              !userInfo.password ||
              passwordError ||
              emailError
            }
          >
            Log In
          </button>
          <div className='or-container'>
            <span className='or-text'>or</span>
          </div>
          <div>
            <GoogleOAuthProvider clientId='788776495482-jgidauvaegmcslr5rif3u7l38ttc7q1b.apps.googleusercontent.com'>
              <GoogleLogin
                width={'350'}
                onSuccess={handleGoogle}
                onError={handleLoginFailure}
                flow='auth-code'
              />
            </GoogleOAuthProvider>
          </div>
          <p>
            Doesn't have an account?{' '}
            <Link to='/register' style={{ color: 'rgb(5, 5, 143)' }}>
              Register
            </Link>
          </p>
          <p style={{ fontSize: 12 }}>
            Email:{' '}
            <span style={{ color: 'rgba(14, 14, 83, 0.589)' }}>
              little@example.com
            </span>{' '}
            <br />
            Password:{' '}
            <span style={{ color: 'rgba(14, 14, 83, 0.589)' }}>123</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
