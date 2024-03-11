import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
const SubProfile = ({ profile_pic, Profile_name, profile_bio }) => {
  return (
    <div className='sugg-people-profile'>
      <div className='sugg-people-pro '>
        <div className='sugg-profile-pic'>
          <img src={profile_pic} alt='' />
        </div>
        <div className='sug-profile-info'>
          <p>{Profile_name}</p>
          <p className='profile-bio-text'>{profile_bio}</p>
          <Link style={{ color: '  rgb(5, 5, 143)' }}>Follow</Link>
        </div>
      </div>
    </div>
  )
}

export default SubProfile
