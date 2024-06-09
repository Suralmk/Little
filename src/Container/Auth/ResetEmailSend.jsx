import React from 'react'
import '../style.css'
import { FaMailchimp } from 'react-icons/fa'
import { CiMail } from 'react-icons/ci'
import Button from '../../Components/Button'

const ResetEmailSend = ({ setIsAuthenticated, HomeUpdate }) => {
  return (
    <div className='auth-form  d_flex'>
      <div className='auth-form-container'>
        <div className='reset-email-send-container'>
          <CiMail size={70} />
          <p>Password reset email is sent to your adrress!</p>
          <Button text='Open Email' />
        </div>
      </div>
    </div>
  )
}

export default ResetEmailSend
