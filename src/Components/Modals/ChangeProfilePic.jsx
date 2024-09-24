import React, { useState, useRef } from 'react'
import { PiXLight, PiUploadBold, PiUploadFill } from 'react-icons/pi'
import { api } from '../../Core/config'
import useGlobal from '../../Core/global'
import { spinner } from '../../assets'
const ChangeProfilePic = ({
  open,
  closeChnageProfilePic,
  profile_pic,
  forceUpdateProfile
}) => {
  const [newProfilePic, setNewProfilePic] = useState()
  const [image, setImage] = useState()
  const user = useGlobal(state => state.user)
  const init = useGlobal(state => state.init)
  const updateProfile = useGlobal(state => state.updateProfile)
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [loading, setLoading] = useState(false)
  const btnref = useRef()

  const updateProfilePic = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profile_pic', newProfilePic)
    setLoading(true)
    btnref.current.disabled = true
    try {
      const response = await api.put(
        `${user.profile.user.username}/update/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token.access}`
          }
        }
      )

      forceUpdateProfile()
      updateProfile({
        ...user.profile,
        profile_pic: response.data.profile_pic
      })
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
    btnref.current.disabled = false
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
            <button
              ref={btnref}
              type='submit'
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15,
                justifyContent: 'center'
              }}
              className={loading ? 'disable-btn' : ''}
            >
              {' '}
              Save{' '}
              {loading ? (
                <>
                  <img src={spinner} alt='' />
                </>
              ) : (
                ''
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePic
