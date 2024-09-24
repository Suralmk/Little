import React, { useState } from 'react'
import './style.css'
import MessageList from '../Components/MessageList'
import { stewie } from '../assets'
import {
  FaTelegramPlane,
  FaChevronRight,
  FaChevronLeft,
  FaRegGrin
} from 'react-icons/fa'
const Message = () => {
  const [toggleFriends, settoggleFriends] = useState(true)
  return (
    <div className='message'>
      {/* <div className='message__toggle-list' id='toggle-message-list-btn'>
        {toggleFriends ? (
          <FaChevronLeft
            onClick={() => {
              settoggleFriends(!toggleFriends)
              const FriendList = document.getElementById('friend-list')
              const MessageLisToggleBtn = document.getElementById(
                'toggle-message-list-btn'
              )
              MessageLisToggleBtn.classList.add('message-tpggle-btn-fix-left')
              FriendList.classList.add('remove-friend-list')
            }}
          />
        ) : (
          <FaChevronRight
            onClick={() => {
              settoggleFriends(!toggleFriends)
              const FriendList = document.getElementById('friend-list')
              FriendList.classList.remove('remove-friend-list')
              const MessageLisToggleBtn = document.getElementById(
                'toggle-message-list-btn'
              )
              MessageLisToggleBtn.classList.remove(
                'message-tpggle-btn-fix-left'
              )
            }}
          />
        )}
      </div>
      <section className='message-lists-container' id='friend-list'>
        <p>Active Messages</p>
        <MessageList />
        <MessageList />
        <MessageList />
        <MessageList />
        <MessageList />
        <MessageList />
        <MessageList />
        <MessageList />
        <MessageList />
        <MessageList />
      </section>
      <section className='message-chat-container'>
        <section className='message-chat-container-header'>
          <div className='message-chat-container-header-profile_pic'>
            <img src={stewie} alt='' />
          </div>
          <div>
            <p>Stewie Griffin</p>
            <p className='message-chat-container-header-last_seen'>
              last seen 2 days ago
            </p>
          </div>
        </section>
        <section className='message-chat-container_chat-container'>
          <div className='message-chat-container_chat'>
            <p className='message-send '>
              This is Send
              <span className='message__name'>you</span>
              <span className='chat__timestamp'>
                {' '}
                {new Date().toDateString()}
              </span>
            </p>
            <p className='message-recieve'>
              This is Recieved by me from a sender
              <span className='message__name'>Stewie</span>
              <span className='chat__timestamp'>
                {' '}
                {new Date().toDateString()}
              </span>
            </p>
            <p className='message-send'>
              This is Recieved by me from a sender
              <span className='message__name'>Stewie</span>
              <span className='chat__timestamp'>
                {' '}
                {new Date().toDateString()}
              </span>
            </p>
            <p className='message-recieve'>
              This is Recieved by me from a sender
              <span className='message__name'>Stewie</span>
              <span className='chat__timestamp'>
                {' '}
                {new Date().toDateString()}
              </span>
            </p>
            <p className='message-recieve'>
              This is Recieved by me from a sender
              <span className='message__name'>Stewie</span>
              <span className='chat__timestamp'>
                {' '}
                {new Date().toDateString()}
              </span>
            </p>
            <p className='message-send'>
              This is Recieved by me from a sender
              <span className='message__name'>Stewie</span>
              <span className='chat__timestamp'>
                {' '}
                {new Date().toDateString()}
              </span>
            </p>
          </div>
        </section>

        <section className='message-chat-send-form'>
          <form action=''>
            <FaRegGrin size={40} className='message-chat-send-form_emoji' />
            <div className='message-chat-send-form_input'>
              <input
                type='text'
                placeholder='Message'
                name='message'
                id='message'
              />
            </div>
            <button type='submit'>
              {' '}
              Send <FaTelegramPlane />
            </button>
          </form>
        </section>
      </section> */}
      <h1>Under Development</h1>
    </div>
  )
}

export default Message
