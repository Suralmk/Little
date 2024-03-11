import React, { useState } from 'react'
import { PiXLight, PiUploadBold, PiUploadFill } from 'react-icons/pi'
import api from '../../Config/config'
const ChangeProfilePic = ({
  open,
  closeChnageProfilePic,
  profile_pic,
  username,
  forceUpdatePro
}) => {
  const [newProfilePic, setNewProfilePic] = useState()
  const [image, setImage] = useState()

  const updateProfilePic = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profile_pic', newProfilePic)

    try {
      const response = await api.put(`${username}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      forceUpdatePro()
      console.log(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='change-profile-pic-modal'>
        <div
          className='close-modal'
          onClick={() => closeChnageProfilePic(!open)}
        >
          <PiXLight size={30} />
        </div>
        <h2>Change Profile Picture</h2>
        <div className='change-profile-pic-container'>
          <div className='current-profile-pic'>
            {image ? (
              <img src={image} alt='' />
            ) : (
              <img src={profile_pic} alt='' />
            )}
          </div>

          <form onSubmit={e => updateProfilePic(e)}>
            <div className='input-field'>
              <label
                className='image-upload-label'
                htmlFor='image-Upload'
                onClick={() => {
                  document.querySelector('.profile-image-upload').click()
                }}
              >
                choose Profile Picture{' '}
                <span>
                  <PiUploadFill />
                </span>
              </label>
              <input
                type='file'
                name='new-profile-pic'
                id='image-upload'
                accept='image/*'
                className='profile-image-upload'
                onChange={e => {
                  setNewProfilePic(e.target.files[0])
                  try {
                    setImage(URL.createObjectURL(e.target.files[0]))
                  } catch (err) {
                    console.log(err)
                  }
                }}
                hidden
              />
            </div>
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePic
