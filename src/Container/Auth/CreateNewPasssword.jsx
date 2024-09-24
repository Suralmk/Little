import React, { useEffect, useState } from 'react'
import '../style.css'
import { ppbg } from '../../assets'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../Core/config'
import NotFound from '../NotFound'
import useGlobal from '../../Core/global'

const CreateNewPassword = () => {
  const addToast = useGlobal(state => state.addToast)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordError2, setPasswordError2] = useState('')
  const { uidb64, token } = useParams()
  const [valid, setValid] = useState(false)
  const navigate = useNavigate()

  const checkResetUrl = async () => {
    try {
      const res = await api.get(`/reset-password/${uidb64}/${token}/`)
      if (res.status === 200 && res.data.valid) {
        setValid(true)
      }
    } catch (err) {
      console.log(err)
      addToast(`${err.code}  ${err.response.data.error}`)
      setValid(false)
    }
  }

  useEffect(() => {
    checkResetUrl()
  }, [])

  const submitLogin = async e => {
    e.preventDefault()

    if (!validateCreatePassword()) {
      return
    }

    try {
      const res = await api.put('create-password/', {
        password: password,
        token: token,
        uidb64: uidb64
      })
      if (res.status === 201) {
        addToast('Password reset successful!')
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
      setValid(false)
      addToast('Password reset failed. Please try again.')
    }
  }

  const validateCreatePassword = () => {
    let isValid = true
    // Check for password field
    if (!password || password.length === 0) {
      setPasswordError('Password is required!')
      isValid = false
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long!')
      isValid = false
    } else {
      setPasswordError('')
    }

    // Check for confirm password field
    if (!password2 || password2.length === 0) {
      setPasswordError2('Confirm Password is required!')
      isValid = false
    } else if (password2 !== password) {
      setPasswordError2('Passwords do not match!')
      isValid = false
    } else {
      setPasswordError2('')
    }

    return isValid
  }

  return (
    <>
      {valid ? (
        <div className='auth-form d_flex'>
          <div className='auth-form-container'>
            <div className='side_bg'>
              <img src={ppbg} alt='' />
            </div>
            <form action='/' onSubmit={submitLogin}>
              <h1>Create Password</h1>
              <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input
                  style={
                    passwordError
                      ? { borderColor: 'rgba(255, 0, 0, 0.753)' }
                      : {}
                  }
                  type='password'
                  name='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className='error-message'>{passwordError}</p>
                )}
              </div>

              <div className='input-field'>
                <label htmlFor='password2'>Confirm Password</label>
                <input
                  style={
                    passwordError2
                      ? { borderColor: 'rgba(255, 0, 0, 0.753)' }
                      : {}
                  }
                  type='password'
                  name='password2'
                  placeholder='Confirm password'
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
                {passwordError2 && (
                  <p className='error-message'>{passwordError2}</p>
                )}
              </div>

              <button type='submit'>Create Password</button>
              <p>Create a new password for your account</p>
            </form>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default CreateNewPassword
