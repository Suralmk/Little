import React, { useState } from 'react'
import { PiXLight, PiUploadFill } from 'react-icons/pi'
import api from '../../Config/config'
const ChangeBgPic = ({
  open,
  closeChangeBgPic,
  bg_pic,
  username,
  forceUpdatePro
}) => {
  const [newBgPic, setNewBgPic] = useState()
  const [Image, setImage] = useState()

  const UpdateBgPic = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('bg_pic', newBgPic)

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
                choose Profile Picture{' '}
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
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangeBgPic
