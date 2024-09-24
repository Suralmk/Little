import React from 'react'
import './style.css'
const ProfileSkeleton = () => {
  return (
    <div className='profile-skeleton'>
      <div className='profile-bg-skeleton'></div>
      <div className='profile-pic-skeleton'></div>
      <div className='profile-name-skeleton'></div>
      <div className='profile-username-skeleton'></div>
      <div className='profile-bio-skeleton'></div>
      <div className='profile-personal-intrests-skeleton'></div>
      <div className='profile-location-skeleton'></div>
      <div className='profile-hashtags-skeleton'></div>
      <div className='profile-status-skeleton'>
        <div className='profile-follower-skeleton'></div>
        <div className='profile-following-skeleton'></div>
      </div>
      <div className='profile-hashtags-skeleton'></div>
    </div>
  )
}

export default ProfileSkeleton
