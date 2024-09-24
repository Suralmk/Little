import React from 'react'
import { PiXLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import './modals.css'

const Following = ({ open, closeFollowingModal, followings }) => {
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='show-following-modal'>
        <div className='close-modal' onClick={() => closeFollowingModal(!open)}>
          <PiXLight size={30} />
        </div>
        <h1>Following</h1>

        <div className='follower-container'>
          {followings && followings.length > 0 ? (
            followings.map((following, index) => (
              <Link
                className='follower-section'
                key={following.username}
                to={`/profile/${following.username}`}
              >
                <div className='follower-profile-image'>
                  <img
                    src={following.profile_pic}
                    alt={`${following.full_name}'s profile`}
                  />
                </div>
                <div className='follower-profile-content'>
                  <p className='follower-name'>{following.full_name}</p>
                  <p className='follower-bio'>{following.username}</p>
                  <p className='follower-bio'>{following.bio}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className='no-data-found'>
              <p>You are not following anyone!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Following
