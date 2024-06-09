import React from 'react'
import { PiXLight, PiMagnifyingGlassLight } from 'react-icons/pi'

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
        <div className='modal-search-form'>
          <div className='input-field'>
            <input type='text' placeholder='Search by Username' />
          </div>
          <div className='modal-search-icon'>
            <PiMagnifyingGlassLight size={25} />
          </div>
        </div>
        <div className='follower-container'>
          {followers.length !== 0 ? (
            followers.map((follower, id) => (
              <React.Fragment key={id}>
                <div className='follower-section'>
                  <div className='follower-profile-image'>
                    <img src={follower.profile_pic} alt='' />
                  </div>
                  <div className='follower-profile-content'>
                    <p className='follower-name'>{follower['full_name']}</p>
                    <p className='follower-bio'>{follower['username']}</p>
                    <p className='follower-bio'>{follower['bio']}</p>
                  </div>
                </div>
              </React.Fragment>
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
