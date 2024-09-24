import React, { useState, useRef, useEffect } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { api } from '../Core/config'

const MyPost = ({ post, forceUpdate }) => {
  const [postmenu, setPostMenu] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // State to manage deleting status
  const token = JSON.parse(localStorage.getItem('tokens'))

  const deletePost = async post_id => {
    setIsDeleting(true) // Set deleting status to true
    try {
      await api.delete(`/posts/${post_id}/delete/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access}`
        }
      })
      console.log('Post deleted successfully')
      forceUpdate() // Trigger the parent component to update
    } catch (err) {
      console.error('Error deleting post:', err.message)
    } finally {
      setIsDeleting(false) // Reset deleting status
    }
  }

  const menuRef = useRef()

  useEffect(() => {
    const handleOutsideClick = event => {
      // Close modal if click is outside of menuRef
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setPostMenu(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className='my-post'>
      <p className='my-post-header'>
        <span className='my-post-title'>{post.title}</span>
        <div className='my-post-menu-option'>
          <FaEllipsisH
            className='my-post-menu-btn'
            onClick={() => setPostMenu(!postmenu)}
          />
          <ul
            ref={menuRef}
            className={`my-post-menu ${postmenu ? 'my-post-menu-open' : ''}`}
          >
            <li>
              <Link to={`/activity/${post.id}/edit/`}>Edit</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  if (
                    window.confirm('Are you sure you want to delete this post?')
                  ) {
                    deletePost(post.id)
                  }
                }}
              >
                Delete
              </Link>
            </li>
          </ul>
        </div>
      </p>
      <p className='my-post-caption'>{post.caption}</p>
      <div className='my-post-image'>
        <img src={post.picture} alt={post.title} />
      </div>
    </div>
  )
}

export default MyPost
