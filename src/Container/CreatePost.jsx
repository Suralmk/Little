import React, { useState } from 'react'
import './style.css'
import { pyramids } from '../assets/index'
import api from '../Config/config'
import { useNavigate } from 'react-router-dom'
import { PiUploadFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const CreatePost = ({ isAuthenticated }) => {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [image, SetImage] = useState()
  const navigate = useNavigate()
  const [postImage, SetPostImage] = useState()

  const [captionError, setCaptionError] = useState('')
  const [imageError, setImageError] = useState('')
  const SubmitPost = async e => {
    e.preventDefault()
    if (isAuthenticated === false) {
      return
    }
    if (validateCreatePost() === false) {
      return
    } else {
      const formData = new FormData()
      formData.append('caption', caption)
      formData.append('picture', image)
      formData.append('title', title)

      console.log(formData)
      try {
        await api.post('/posts/create/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        navigate('/')
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const validateCreatePost = () => {
    const failCaption = !caption
    if (failCaption) {
      setCaptionError('Must have at least a content!')
    } else {
      setCaptionError('')
    }

    const failImage = !image
    if (failImage) {
      setImageError('Image is required to create a post')
    } else {
      setImageError('')
    }

    if (failCaption || failImage) {
      return false
    }
  }
  return (
    <React.Fragment>
      <div className='create-post'>
        <div className='create-post-form'>
          <div className='form-message'>
            {isAuthenticated ? (
              <></>
            ) : (
              <p className='error'>
                Please login to your account to make a post!
              </p>
            )}
          </div>
          <h1>Create Your Post</h1>
          <form
            onSubmit={e => {
              SubmitPost(e)
            }}
          >
            <div className='input-field'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                name='title'
                placeholder='Ttile'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <label htmlFor='caption'>Caption</label>
              <textarea
                style={
                  captionError ? { borderColor: 'rgba(255, 0, 0, 0.753)' } : {}
                }
                name='caption'
                id='caption'
                cols='30'
                rows='5'
                value={caption}
                onChange={e => setCaption(e.target.value)}
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
                <img src={postImage} alt='' />
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
                name='create-post-image'
                hidden
                accept='image/*'
                onChange={e => {
                  SetImage(e.target.files[0])
                  try {
                    SetPostImage(URL.createObjectURL(e.target.files[0]))
                  } catch (err) {
                    console.log(err.message)
                  }
                }}
              />
            </div>

            <button type='submit'>Post</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CreatePost
