import React from 'react'
import '../style.css'
import { useState, useRef } from 'react'
import { side_bg2 } from '../../assets'
import api from '../../Config/config'

const ResetPassword = ({ setIsAuthenticated, HomeUpdate }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmaiError] = useState()
  const [resetMessage, setResetMessage] = useState({})
  const emailVal = useRef()

  const submitLogin = async e => {
    e.preventDefault()

    if (validatePasswordReset() == false) {
      return
    } else {
      try {
        const response = await api.post('reset-password/', {
          email: email
        })
        const data = response.data
        if (data.success) {
          data['message'] = 'please check your email'
          setResetMessage(data)
        }
        emailVal.current.value = ''
      } catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setResetMessage({ error: 'Email does not exist!' })
            emailVal.current.value = ''
          }
        }
      }
    }
  }

  const validatePasswordReset = () => {
    const failEmail = !email || email.length === 0
    if (failEmail) {
      setEmaiError('Email is required!')
    } else {
      setEmaiError('')
    }

    if (failEmail) {
      return false
    }
  }
  return (
    <div className='auth-form  d_flex'>
      <div className='auth-form-container'>
        <form action='/' onSubmit={e => submitLogin(e)} className=''>
          <h1>Reset Password </h1>
          <div className='input-field '>
            <label htmlFor='email'>Email</label>
            <input
              style={
                emailError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='email'
              name='email'
              placeholder='Enter email'
              ref={emailVal}
              onChange={() => setEmail(emailVal.current.value)}
            />
            {emailError ? <p className='error-message'>{emailError}</p> : ''}
          </div>

          <button type='submit'>Reset Password</button>
          <p>
            Password reset link will be sent to your email. Please enter a valid
            email adress.
          </p>

          <div className='form-message'>
            {resetMessage.success ? (
              <p className='success'>
                {' '}
                {resetMessage.success} <br /> <br />
                {resetMessage.message}
              </p>
            ) : (
              <></>
            )}
            {resetMessage.error ? (
              <p className='error'>{resetMessage.error}</p>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
