import React from 'react'
import '../style.css'
import { GoogleLogin } from 'react-google-login'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { api } from '../../Core/config'
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
        const res = await api.post('login/', userInfo, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (res.status === 200) {
          navigate('/')
          login(res.data)
          addToast('Succesfully Logged In!', 'success')
        }
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

  const responseGoogle = response => {
    api
      .post('http://localhost:8000/auth/google/', {
        access_token: response.tokenId
      })
      .then(res => {
        console.log(res.data)
        // Store tokens in localStorage or context
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        // Handle successful authentication
      })
      .catch(err => {
        console.error(err)
        // Handle errors
      })
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

          <GoogleLogin
            disabled={false}
            className='google-btn'
            disabledStyle={{
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              padding: 0,
              border: '1px rgba(0, 0, 0, 0.385) solid',
              width: '100%',
              boxShadow: 'none',
              borderRadius: '5px'
            }}
            clientId='YOUR_GOOGLE_CLIENT_ID'
            buttonText='Login with Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

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
