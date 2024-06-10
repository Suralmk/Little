// SkeletonLoading.jsx

import React from 'react'
import './style.css' // Import your CSS file for styling

const SkeletonPostsLoading = () => {
  return (
    <div className='post-skeleton-loading'>
      <div className='loading-post-header'>
        <div className='loading-post-owner-profile-pic'></div>
        <div className='loading-post-header-detail'>
          <div className='loading-header-name'></div>
          <div className='loading-header-name'></div>
        </div>
      </div>
      <div className='loadig-content'>
        <div className='skeleton-loading-item-title'></div>
        <div className='skeleton-loading-item-content'></div>
      </div>
    </div>
  )
}

export default SkeletonPostsLoading
