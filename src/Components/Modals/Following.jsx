import React from 'react'
import { PiXLight, PiMagnifyingGlassLight } from 'react-icons/pi'

import './modals.css'
const Following = ({ open, closeFollowingModal, followings }) => {
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='show-following-modal'>
        <div
          to=' '
          className='close-modal'
          onClick={() => closeFollowingModal(!open)}
        >
          <PiXLight size={30} />
        </div>
        <h1>Following</h1>
        <div className='modal-search-form'>
          <div className='input-field'>
            <input type='text' placeholder='Search by Username' />
          </div>
          <div className='modal-search-icon'>
            <PiMagnifyingGlassLight size={25} />
          </div>
        </div>
        <div className='follower-container'>
          {followings.length !== 0 ? (
            followings.map((following, id) => (
              <div className='follower-section' key={id}>
                <div className='follower-profile-image'>
                  <img src={following.profile_pic} alt='' />
                </div>
                <div className='follower-profile-content'>
                  <p className='follower-name'>{following.full_name}</p>
                  <p className='follower-bio'>{following.username}</p>
                  <p className='follower-bio'>{following.bio}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data-found'>
              <p>You are not following anyone! </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Following
