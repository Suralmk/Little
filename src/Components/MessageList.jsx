import React from 'react'
import { stewie } from '../assets/index'

const MessageList = () => {
  return (
    <div className='message-list-component'>
      <div className='message-lits-component-profile-pic'>
        <img src={stewie} alt='' />
      </div>
      <div className='message-list-component-detail'>
        <p className='message-list-component-detail-full_name'>
          Stewie Griffin
        </p>
        <p className='message-list-component-detail-last_message'>
          I have seen the email you sent me it suckss
        </p>
        <p className='message-list-component-detail-last_seen'>
          last seen 2 days ago
        </p>
        <p className='message-list-component-detail-last_message-notification'>
          12
        </p>
      </div>
    </div>
  )
}

export default MessageList
