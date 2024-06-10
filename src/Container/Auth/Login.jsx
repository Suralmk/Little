import React from 'react'
import '../style.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, googleapi } from '../../Core/config'
import useGlobal from '../../Core/global'
const Login = ({}) => {
  const login = useGlobal(state => state.login)
  const addToast = useGlobal(state => state.addToast)
  const setLoading = useGlobal(state => state.setLoading)
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmaiError] = useState('')

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async event => {
    event.preventDefault()

    if (validateLogin() === false) {
      return
    } else {
      setLoading(true)
      try {
        const res = await api
          .post('login/', userInfo, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status === 200) {
              login(res.data)
              navigate('/')
              addToast('Succesfully Logged In!', 'success')
            }
          })
      } catch (err) {
        console.log(err)
        if (err.response) {
          addToast(`${err.response.data.detail}`, 'failure')
        } else {
          addToast(`There is a ${err.message}!`, 'failure')
        }
      }
      setLoading(false)
    }
  }

  const validateLogin = () => {
    const failEmail = !userInfo.email || userInfo.email.length === 0
    if (failEmail) {
      setEmaiError('Email is required!')
    } else {
      setEmaiError('')
    }

    const failPassword = !userInfo.password || userInfo.password.length < 2
    if (failPassword) {
      setPasswordError('Password is required!')
    } else {
      setPasswordError('')
    }

    if (failPassword || failEmail) {
      return false
    }
  }

  const handleGoogle = async response => {
    setLoading(true)
    await googleapi
      .post('/auth/convert-token/', {
        access_token: response.tokenId
      })
      .then(res => {
        console.log(res.data)
        login(res.data)
      })
      .catch(err => {
        console.error(err)
      })
    setLoading(false)
  }

  const handleLoginFailure = () => {
    console.error('Login Failed')
  }
  return (
    <div className='auth-form d_flex'>
      <div className='auth-form-container'>
        <form>
          <h1>Log In</h1>
          <div className='input-field '>
            <label htmlFor='email'>Email</label>
            <input
              style={
                emailError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={event => {
                handleChange(event)
              }}
            />
            {emailError ? <p className='error-message'>{emailError}</p> : ''}
          </div>
          <div className='input-field '>
            <label htmlFor='password'>Password</label>
            <input
              style={
                passwordError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='password'
              name='password'
              placeholder='Enter password'
              onChange={event => {
                handleChange(event)
              }}
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
          <button
            type='submit'
            onClick={event => {
              handleLogin(event)
            }}
          >
            Log In
          </button>
          <div className='or-container'>
            <span className='or-text'>or</span>
          </div>
          <GoogleOAuthProvider clientId='YOUR_GOOGLE_CLIENT_ID'>
            <GoogleLogin
              onSuccess={handleGoogle}
              onError={handleLoginFailure}
            />
          </GoogleOAuthProvider>

          <p>
            Doesn't have an account?{' '}
            <Link to='/register' style={{ color: 'rgb(5, 5, 143)' }}>
              Register
            </Link>
          </p>
          <p style={{ fontSize: 12 }}>
            Email:{' '}
            <span style={{ color: 'rgba(14, 14, 83, 0.589)' }}>
              su@gmail.com
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
