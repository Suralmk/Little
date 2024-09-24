import React, { useState } from 'react'
import './style.css'
import { api } from '../Core/config'
import { useNavigate } from 'react-router-dom'
import { PiUploadFill } from 'react-icons/pi'
import useGlobal from '../Core/global'

const CreatePost = () => {
  const setLoading = useGlobal(state => state.setLoading)
  const addToast = useGlobal(state => state.addToast)
  const token = JSON.parse(localStorage.getItem('tokens'))

  const [postData, setPostData] = useState({
    title: '',
    caption: ''
  })

  const [image, setImage] = useState(null)
  const [postImage, setPostImage] = useState(null)

  const [captionError, setCaptionError] = useState('')
  const [imageError, setImageError] = useState('')

  const navigate = useNavigate()

  const handleChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    })
  }

  const validateCreatePost = () => {
    const failCaption = !postData.caption
    const failImage = !image

    setCaptionError(failCaption ? 'Must have at least a content!' : '')
    setImageError(failImage ? 'Image is required to create a post' : '')

    return !(failCaption || failImage)
  }

  const submitPost = async e => {
    e.preventDefault()

    if (!validateCreatePost()) {
      return
    }

    const formData = new FormData()
    formData.append('title', postData.title)
    formData.append('caption', postData.caption)
    formData.append('picture', image)

    setLoading(true)
    try {
      await api.post('/posts/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token.access}`
        }
      })
      // Clear the form after successful submission
      setPostData({
        title: '',
        caption: ''
      })
      setImage(null)
      setPostImage(null) // Clear the image preview
      addToast('Post Uploaded Successfully', 'success')
      navigate('/') // Optionally redirect after posting
    } catch (err) {
      console.log(err.message)
      addToast('Error uploading post. Please try again.', 'failure') // Notify user of the error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-post'>
      <div className='create-post-form'>
        <h1>Create Your Post</h1>
        <form onSubmit={submitPost}>
          <div className='input-field'>
            <label htmlFor='title'>Title</label>
            <input
              className='post-input-fileds'
              type='text'
              name='title'
              placeholder='Title'
              value={postData.title} // Ensure controlled input
              onChange={handleChange}
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
              value={postData.caption} // Ensure controlled input
              onChange={handleChange}
              placeholder='Caption'
            />
            {captionError && <p className='error-message'>{captionError}</p>}
          </div>

          <div className='input-field'>
            <div className='post-image-show'>
              {postImage && <img src={postImage} alt='Selected' />}
            </div>
            <label
              style={
                imageError ? { backgroundColor: 'rgba(255, 0, 0, 0.453)' } : {}
              }
              className='image-upload-label'
              onClick={() =>
                document.querySelector('.post-image-upload').click()
              }
            >
              Choose Image{' '}
              <span>
                <PiUploadFill />
              </span>
            </label>
            {imageError && <p className='error-message'>{imageError}</p>}
            <input
              id='image-upload'
              type='file'
              className='post-image-upload'
              name='picture'
              hidden
              accept='image/*'
              onChange={event => {
                const file = event.target.files[0]
                if (file) {
                  setImage(file)
                  setPostImage(URL.createObjectURL(file))
                }
              }}
            />
          </div>

          <button type='submit'>Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
