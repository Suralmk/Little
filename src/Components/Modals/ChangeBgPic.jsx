import React, { useState, useRef } from 'react'
import { PiXLight, PiUploadFill } from 'react-icons/pi'
import { api } from '../../Core/config'
import useGlobal from '../../Core/global'
import { spinner } from '../../assets'
const ChangeBgPic = ({
  open,
  closeChangeBgPic,
  bg_pic,
  forceUpdateProfile
}) => {
  const [newBgPic, setNewBgPic] = useState()
  const [Image, setImage] = useState()
  const user = useGlobal(state => state.user)
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [loading, setLoading] = useState(false)
  const btnref = useRef()

  const UpdateBgPic = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('bg_pic', newBgPic)
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
    } catch (err) {
      console.log(err.message)
    }
    setLoading(false)
    btnref.current.disabled = false
  }
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className='change-profile-pic-modal'>
        <div className='close-modal' onClick={() => closeChangeBgPic(!open)}>
          <PiXLight size={30} />
        </div>
        <h2>Change Background Picture</h2>
        <div className='change-profile-pic-container'>
          <div className='current-bg-pic'>
            {Image ? <img src={Image} alt='' /> : <img src={bg_pic} alt='' />}
          </div>

          <form onSubmit={e => UpdateBgPic(e)}>
            <div className='input-field'>
              <label
                className='image-upload-label'
                htmlFor='image-Upload'
                onClick={() => {
                  document.querySelector('.bg-image-upload').click()
                }}
              >
                choose Background Picture{' '}
                <span>
                  <PiUploadFill />
                </span>
              </label>{' '}
              <input
                type='file'
                name='new-profile-pic'
                className='bg-image-upload'
                id='image-upload'
                accept='image/*'
                hidden
                onChange={e => {
                  setNewBgPic(e.target.files[0])
                  try {
                    setImage(URL.createObjectURL(e.target.files[0]))
                  } catch (err) {
                    console.log(err)
                  }
                }}
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

export default ChangeBgPic
