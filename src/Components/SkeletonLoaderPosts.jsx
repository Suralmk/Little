// SkeletonLoading.jsx

import React from 'react'
import './style.css' // Import your CSS file for styling

const SkeletonPostsLoading = () => {
  return (
    <div className='skeleton-loading'>
      <div className='skeleton-loading-item'></div>
      <div className='skeleton-loading-item'></div>
      <div className='skeleton-loading-item'></div>
      {/* Add more skeleton items as needed */}
    </div>
  )
}

export default SkeletonPostsLoading
