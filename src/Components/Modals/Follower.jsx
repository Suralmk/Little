import React from 'react'
import { PiXLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
const Follower = ({ closeFollowerModal, open, followers }) => {
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='show-follower-modal'>
        <div
          to=' '
          className='close-modal'
          onClick={() => closeFollowerModal(!open)}
        >
          <PiXLight size={30} />
        </div>
        <h1>Followers</h1>

        <div className='follower-container'>
          {followers?.length !== 0 ? (
            followers?.map((follower, index) => (
              <Link
                className='follower-section'
                key={follower.username}
                to={`/profile/${follower.username}`}
              >
                <div className='follower-profile-image'>
                  <img src={follower.profile_pic} alt='' />
                </div>
                <div className='follower-profile-content'>
                  <p className='follower-name'>{follower.full_name}</p>
                  <p className='follower-bio'>{follower.username}</p>
                  <p className='follower-bio'>{follower?.bio}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className='no-data-found'>
              <p>you have no followers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Follower
