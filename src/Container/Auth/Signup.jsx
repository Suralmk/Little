import React from 'react'
import '../style.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { side_bg2 } from '../../assets/index'
import { useNavigate } from 'react-router-dom'
import useGlobal from '../../Core/global'
import { api } from '../../Core/config'

const Signup = ({}) => {
  const login = useGlobal(state => state.login)
  const addToast = useGlobal(state => state.addToast)
  const setLoading = useGlobal(state => state.setLoading)
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: ''
  })

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmaiError] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const handleRegister = async e => {
    e.preventDefault()
    if (validateSignup() === false) {
      return
    } else {
      setLoading(true)
      try {
        const res = await api.post('register/', userInfo)
        if (res.status === 201) {
          addToast('Succesfully Registered!', 'success')
          login(res.data)
          navigate('/')
          console.log(res)
        }
      } catch (err) {
        if (err.response) {
          addToast(`${err.response.data.error}`, 'failure')
        } else {
          addToast(`${err.message}!`, 'failure')
        }
      }
      setLoading(false)
    }
  }

  const validateSignup = () => {
    const failemail = !userInfo.email || userInfo.email.length === 0
    if (failemail) {
      setEmaiError('Email is required')
    } else {
      setEmaiError('')
    }

    const failusername = !userInfo.username || userInfo.username.length === 0
    if (failusername) {
      setUsernameError('Username is required!!')
    } else {
      setUsernameError('')
    }

    const failPassword = !userInfo.password || userInfo.password.length < 3
    if (failPassword) {
      setPasswordError('Password is required!')
    } else {
      setPasswordError('')
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
        <form>
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
              onChange={e => handleChange(e)}
            />
            {emailError ? <p className='error-message'>{emailError}</p> : ''}
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
              onChange={e => handleChange(e)}
            />
            {usernameError ? (
              <p className='error-message'>{usernameError}</p>
            ) : (
              ''
            )}
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
              onChange={e => handleChange(e)}
            />
            {passwordError ? (
              <p className='error-message'>{passwordError}</p>
            ) : (
              ''
            )}
          </div>
          <button
            type='submit'
            onClick={event => {
              handleRegister(event)
            }}
          >
            Sign Up
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
            // onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
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
