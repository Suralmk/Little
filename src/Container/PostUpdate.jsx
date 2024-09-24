import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../Core/config'
import useGlobal from '../Core/global'
import { PiUploadFill } from 'react-icons/pi'

const PostUpdate = () => {
  const { postId } = useParams()
  const addToast = useGlobal(state => state.addToast)
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [post, setPost] = useState({
    title: '',
    caption: ''
  })
  const [image, setImage] = useState()

  const [captionError, setCaptionError] = useState('')
  const [imageError, setImageError] = useState('')
  const handleChange = e => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }

  const submitUpdate = async e => {
    e.preventDefault()
    if (validateUpdatePost() === false) {
      return
    } else {
      const formData = new FormData()
      formData.append('title', post?.title)
      formData.append('caption', post?.caption)
      formData.append('picture', image)
      try {
        const res = await api.put(`/posts/${post.id}/update/`, formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access}`
          }
        })
        console.log(res.data)
        addToast('Post Updated', 'success')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const validateUpdatePost = () => {
    const failCaption = !post?.caption
    if (failCaption) {
      setCaptionError('Must have at least a content!')
    } else {
      setCaptionError('')
    }

    if (failCaption) {
      return false
    }
  }

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${postId}/`)
      setPost(res.data)
      setImage(post.picture)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <>
      <div className='create-post'>
        <div className='create-post-form'>
          <h1>Edit Your Post</h1>
          <form
            onSubmit={e => {
              submitUpdate(e)
            }}
          >
            <div className='input-field'>
              <label htmlFor='title'>Title</label>
              <input
                className='post-input-fileds'
                type='text'
                name='title'
                placeholder='Ttile'
                value={post?.title}
                onChange={event => {
                  handleChange(event)
                }}
              />
            </div>
            <div className='input-field'>
              <label htmlFor='caption'>Caption</label>
              <textarea
                style={
                  captionError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
                }
                name='caption'
                className='post-input-fileds'
                id='caption'
                cols='30'
                rows='5'
                value={post?.caption}
                onChange={event => {
                  handleChange(event)
                }}
                placeholder='caption'
              ></textarea>

              {captionError ? (
                <p className='error-message'>{captionError}</p>
              ) : (
                ''
              )}
            </div>

            <div className='input-field'>
              <div className='post-image-show'>
                {' '}
                <img src={image ? image : post?.picture} alt='' />
              </div>
              <label
                style={
                  imageError
                    ? { backgroundColor: 'rgba(255, 0, 0, 0.453)' }
                    : {}
                }
                className='image-upload-label'
                htmlFor='image-Upload'
                onClick={() => {
                  document.querySelector('.post-image-upload').click()
                }}
              >
                choose Image{' '}
                <span>
                  <PiUploadFill />
                </span>
              </label>{' '}
              {imageError ? <p className='error-message'>{imageError}</p> : ''}
              <input
                id='image-upload'
                type='file'
                className='post-image-upload'
                name='picture'
                hidden
                accept='image/*'
                onChange={event => {
                  setImage(event.target.files[0])

                  try {
                    setImage(URL.createObjectURL(event.target.files[0]))
                  } catch (err) {
                    console.log(err.message)
                  }
                }}
              />
            </div>

            <button type='submit'>Save Changes</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostUpdate
