import React, { useEffect } from 'react'
import '../style.css'
import { useState } from 'react'
import { side_bg2 } from '../../assets'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../Config/config'

const CreateNewPassword = ({ setIsAuthenticated, HomeUpdate }) => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [passwordError, setPasswordError] = useState('')
  const [passwordError2, setPasswordError2] = useState('')

  const { uidb64, token } = useParams()
  const navigate = useNavigate()

  const checkResetUrl = async () => {
    try {
      const checkResponse = await api.get(`/reset-password/${uidb64}/${token}/`)
      if (checkResponse.data.valid) {
        navigate(`/reset-password/${uidb64}/${token}`)
      } else {
        navigate('/not-found')
      }
    } catch (err) {
      navigate(
        '/not-found'
        // (data = {
        //   error:
        //     'Error reseting your passsword \n Maybe the link is invalid is or expired'
        // })
      )
    }
  }

  useEffect(() => {
    checkResetUrl()
  }, [])

  const submitLogin = async e => {
    e.preventDefault()
    if (validateCreatePassword() == false) {
      return
    } else {
      try {
        const response = api.patch('create-password/', {
          password: password,
          token: token,
          uidb64: uidb64
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const validateCreatePassword = () => {
    const failPassword = !password || password.length === 0
    if (failPassword) {
      setPasswordError('password is required!')
    } else {
      setPasswordError('')
    }

    const failPassword2 = !password2 || password2.length === 0
    if (failPassword2) {
      setPasswordError2('Password is required!')
    } else if (password2 !== password) {
      setPasswordError2('Password does not match!')
    } else {
      setPasswordError2('')
    }

    if (failPassword || failPassword2) {
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
          <h1>Create Password </h1>
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

          <div className='input-field '>
            <label htmlFor='password'>confirm PASSWORD</label>
            <input
              style={
                passwordError2 ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
              }
              type='password'
              name='password2'
              placeholder='Confirm password'
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            {passwordError2 ? (
              <p className='error-message'>{passwordError2}</p>
            ) : (
              ''
            )}
          </div>

          <button type='submit'>Create Password</button>
          <p>Create a new password for your account</p>
        </form>
      </div>
    </div>
  )
}

export default CreateNewPassword
