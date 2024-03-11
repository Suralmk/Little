import React, { useEffect, useState, useReducer, useRef } from 'react'
import { FaRegComment, FaShare, FaEllipsisH } from 'react-icons/fa'
import { PiPaperPlaneRight } from 'react-icons/pi'
import { BiHeart } from 'react-icons/bi'
import { ImHeart } from 'react-icons/im'
import { Link } from 'react-router-dom'
import './style.css'
import './Modals/modals.css'
import Comments from './Modals/Comments'
import api from '../Config/config'

const Post = ({ post, tags, forceUpdatePro }) => {
  const commentinput = useRef()
  const [like, setLike] = useState(false)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const [ignoredComment, forceUpdateComment] = useReducer(x => x + 1, 0)
  const [showCommentsModal, setshowCommentsModal] = useState(false)

  const [postComments, setPostComments] = useState([])
  const getPostComments = async url => {
    try {
      const response = await api.get(url)
      setPostComments(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }
  const [likeData, setLikeData] = useState([])
  useEffect(() => {
    getLikes()
    //getPostComments()
  }, [ignored])

  useEffect(() => {
    //getPostComments()
  }, [ignoredComment])

  const getLikes = async () => {
    const response = await api.get(`posts/${post.id}/like/`)
    var current_user = localStorage.getItem('username')
    const likeData = response.data
    setLikeData(likeData)
    for (var i = 0; i < likeData.length; i++) {
      if (current_user === likeData[i].username) {
        setLike(true)
      }
    }
  }

  const handleLike = async id => {
    await api.post(`posts/${id}/like/`)
    forceUpdate()
  }

  const handleUnlike = async id => {
    await api.delete(`posts/${id}/like/`)
    forceUpdate()
  }

  const [comment, setComment] = useState()
  const [commentError, setCommentError] = useState('')
  const SubmitComment = async (e, post_id) => {
    e.preventDefault()

    if (validateComment() === false) {
      return
    } else {
      try {
        const response = await api.post(`posts/${post_id}/comments/create/`, {
          comment: comment
        })
        commentinput.current.value = ''
        setComment('')
        forceUpdateComment()
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const validateComment = () => {
    const failComment = !comment
    if (failComment) {
      setCommentError('Comment is empty')
    } else {
      setCommentError('')
    }

    if (failComment) {
      return false
    }
  }
  return (
    <React.Fragment>
      <div className='posts'>
        <div className='post-header'>
          <div className='post-owner-profile-pic'>
            <img src={post.owner['profile_pic']} alt='' />
          </div>
          <div className='post-detail'>
            <Link
              className='post-owner-full_name'
              to={`profile/${post.owner.username}/`}
              state={{ username: post.owner.username }}
            >
              {post.owner.full_name}
            </Link>
            <p className='post-username'>
              <p>{post.owner.username}</p>
            </p>
            <p className='post-time'>
              posted at {new Date(post.date_posted).toDateString()}
            </p>
          </div>
          {/* <FaEllipsisH /> */}
        </div>
        <div className='post-content'>
          <h2> {post.title}</h2>
          <p>{post.caption}</p>
          <div className='blog-image'>
            <img src={post.picture} alt='' />
          </div>
          <div className='post-actions'>
            <div className='likes'>
              {like ? (
                <ImHeart
                  className='like'
                  color='rgba(35, 11, 143, 0.318)'
                  size={20}
                  onClick={() => {
                    setLike(!like)
                    handleUnlike(post.id)
                  }}
                />
              ) : (
                <BiHeart
                  className='like'
                  size={20}
                  onClick={() => {
                    setLike(!like)
                    handleLike(post.id)
                  }}
                />
              )}{' '}
              <p id='like-number'>{likeData.length}</p>
            </div>
            <div className='shares'>
              <FaShare size={20} className='share' />{' '}
              <p id='shares-value'>{post.shares}</p>
            </div>
            <div className='shares'>
              <FaRegComment
                size={20}
                className='share'
                onClick={() => {
                  setshowCommentsModal(!showCommentsModal)
                  getPostComments(post.comment_url)
                }}
              />{' '}
              <p id='shares-value'>{postComments.length}</p>
            </div>
          </div>
          <div
            className={`comment-section ${
              commentError ? 'comment-section-error' : ''
            }`}
          >
            <form onSubmit={e => SubmitComment(e, post.id)}>
              <input
                style={
                  commentError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
                }
                type='text'
                className='blog-comment'
                placeholder={commentError ? commentError : 'Comment'}
                onChange={e => setComment(e.target.value)}
                ref={commentinput}
              />
              <button type='submit'>
                <PiPaperPlaneRight size={23} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Comments
        open={showCommentsModal}
        closeShowCommentsModal={setshowCommentsModal}
        comments={postComments}
      />
    </React.Fragment>
  )
}

export default Post
