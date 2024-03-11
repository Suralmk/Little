import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { pyramids, ppbg, side_bg } from '../assets'
import { FaEllipsisH } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import api from '../Config/config'
const MyPost = ({ post, forceUpdate }) => {
  const [postmenu, setPostMneu] = useState(false)
  const deletePost = post_id => {
    try {
      const response = api.delete(`/posts/${post_id}/delete/`)
      console.log(response.data)
      forceUpdate()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <React.Fragment>
      <div className='my-post'>
        <p className='my-post-header'>
          <p className='my-post-title'>{post.title}</p>
          <div className='my-post-menu-option'>
            {' '}
            <FaEllipsisH
              className='my-post-menu-btn'
              onClick={() => setPostMneu(!postmenu)}
            />
            <ul
              className={` my-post-menu ${postmenu ? 'my-post-menu-open' : ''}`}
            >
              <li>
                <Link to={`/activity/${post.id}/edit/`}>Edit</Link>
              </li>
              <li>
                <Link onClick={() => deletePost(post.id)}>Delete</Link>
              </li>
            </ul>
          </div>
        </p>
        <p className='my-post-caption'>{post.caption}</p>
        <div className='my-post-image'>
          <img src={post.picture} alt='' />
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyPost
