import React, { useEffect, useState, useReducer, useRef } from 'react'
import './style.css'
import './Modals/modals.css'
import { FaRegComment } from 'react-icons/fa'
import { PiPaperPlaneRight } from 'react-icons/pi'
import { BiHeart } from 'react-icons/bi'
import { ImHeart } from 'react-icons/im'
import { Link } from 'react-router-dom'
import Comments from './Modals/Comments'
import { api } from '../Core/config'
import useGlobal from '../Core/global'

const Post = ({ post }) => {
  const commentinput = useRef()
  const [like, setLike] = useState(false)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const [ignoredComment, forceUpdateComment] = useReducer(x => x + 1, 0)
  const [showCommentsModal, setshowCommentsModal] = useState(false)
  const [totalComment, setTotalComment] = useState(post?.total_comments)
  const addToast = useGlobal(state => state.addToast)
  const user = useGlobal(state => state.user.profile.user)
  const token = JSON.parse(localStorage.getItem('tokens'))

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
  }, [ignored])

  const getLikes = async () => {
    const response = await api.get(`posts/${post.id}/like/`)
    const likeData = response.data
    setLikeData(likeData)

    // Check if the current user has liked the post
    const likedByCurrentUser = likeData.some(
      like => like.username === user.username
    )
    setLike(likedByCurrentUser)
  }

  const handleLike = async id => {
    await api.post(
      `posts/${id}/like/`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access}`
        }
      }
    )
    setLike(true)
    forceUpdate()
  }

  const handleUnlike = async id => {
    await api.delete(`posts/${id}/like/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`
      }
    })
    setLike(false)
    forceUpdate()
  }

  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')
  const SubmitComment = async (e, post_id) => {
    e.preventDefault()

    if (validateComment() === false) {
      return
    } else {
      try {
        await api.post(
          `posts/${post_id}/comments/create/`,
          {
            comment: comment
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.access}`
            }
          }
        )
        commentinput.current.value = ''
        setComment('')
        forceUpdateComment()
        setTotalComment(totalComment + 1)
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const validateComment = () => {
    const failComment = !comment
    if (failComment) {
      setCommentError('Write something first!')
    } else {
      setCommentError('')
    }

    return !failComment
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
          <h2>{post.title}</h2>
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
                    handleUnlike(post.id)
                  }}
                />
              ) : (
                <BiHeart
                  className='like'
                  size={20}
                  onClick={() => {
                    handleLike(post.id)
                  }}
                />
              )}
              <p id='like-number'>{likeData.length} Likes</p>
            </div>

            <div className='shares'>
              <FaRegComment
                size={20}
                className='share'
                onClick={() => {
                  setshowCommentsModal(!showCommentsModal)
                  getPostComments(post.comment_url)
                }}
              />
              <p id='shares-value'>{totalComment} Comments</p>
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
