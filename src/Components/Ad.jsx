import React from 'react'
import { pyramids, side_bg } from '../assets'
import { Link } from 'react-router-dom'
const Ad = () => {
  return (
    <div className='ad-container'>
      <h2 className='ad-title'>Little Camping Tour</h2>
      <div className='ad-image'>
        <img src={side_bg} alt='' />
      </div>
      <p className='ad-content'>
        Sice 2021 we have made the world little to access and share resources!
        <span>.</span>
      </p>
    </div>
  )
}

export default Ad
