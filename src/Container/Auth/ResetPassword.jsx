import React, { useState, useRef } from 'react'
import '../style.css'
import { api } from '../../Core/config'
import { spinner } from '../../assets'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [resetMessage, setResetMessage] = useState({})
  const emailVal = useRef()
  const btnRef = useRef()
  const [loading, setLoading] = useState(false)

  const submitLogin = async e => {
    e.preventDefault()

    if (!validatePasswordReset()) {
      return
    } 

    setLoading(true)
    btnRef.current.disabled = true

    try {
      const response = await api.post('reset-password/', { email })
      const data = response.data

      if (data.success) {
        setResetMessage({ success: 'Please check your email', message: data.message })
      }

      resetForm()
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setResetMessage({ error: 'Email does not exist!' })
        resetForm()
      } else {
        setResetMessage({ error: 'Something went wrong, please try again later.' })
      }
    } finally {
      setLoading(false)
      btnRef.current.disabled = false
    }
  }

  const validatePasswordReset = () => {
    if (!email || email.trim().length === 0) {
      setEmailError('Email is required!')
      return false
    } else {
      setEmailError('')
      return true
    }
  }

  const resetForm = () => {
    emailVal.current.value = ''
    setEmail('')
  }

  return (
    <div className='auth-form d_flex'>
      <div className='auth-form-container'>
        <form action='/' onSubmit={submitLogin}>
          <h1>Reset Password</h1>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input
              style={emailError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}}
              type='email'
              name='email'
              placeholder='Enter email'
              ref={emailVal}
              onChange={() => setEmail(emailVal.current.value)}
            />
            {emailError && <p className='error-message'>{emailError}</p>}
          </div>

          <button
            type='submit'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15 }}
            ref={btnRef}
          >
            Reset Password
            {loading && <img src={spinner} alt='loading' width='25' />}
          </button>
          <p>Password reset link will be sent to your email. Please enter a valid email address.</p>

          <div className='form-message'>
            {resetMessage.success && (
              <p className='success'>
                {resetMessage.success} <br /> <br />
                {resetMessage.message}
              </p>
            )}
            {resetMessage.error && <p className='error'>{resetMessage.error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
