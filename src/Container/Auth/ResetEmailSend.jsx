import React from 'react'
import '../style.css'
import { side_bg2 } from '../../assets'
import api from '../../Config/config'

const ResetEmailSend = ({ setIsAuthenticated, HomeUpdate }) => {
  return (
    <div className='auth-form  d_flex'>
      <div className='auth-form-container'>
        <div className='side_bg'>
          <img src={side_bg2} alt='' />
        </div>
        <div className='reset-email-send-container'>
          <p>password reset email is send</p>
        </div>
      </div>
    </div>
  )
}

export default ResetEmailSend
