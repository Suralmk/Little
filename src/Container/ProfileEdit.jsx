import React, { useState, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import api from '../Config/config'
import './style.css'
const ProfileEdit = ({ forceUpdate }) => {
  const navigate = useNavigate()
  const username = useParams()
  const profile = useLocation().state.profile
  // if (username !== localStorage.getItem('username')) {
  //   navigate('/not-found')
  // }
  const [updated_first_name, setFirstName] = useState(profile.first_name)
  const [updated_last_name, setLastName] = useState(profile.last_name)
  const [updated_phone_no, setPhoneNumber] = useState(profile.phone)
  const [updated_bio, setBio] = useState(profile.bio)
  const [updated_personal_intrests, setPerosnalIntrests] = useState(
    profile.personal_intrests
  )
  const [updated_location, SetLocation] = useState(profile.location)
  const [updated_birth_date, setBirthDate] = useState(profile.birth_date)

  const UpdateProfile = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('first_name', updated_first_name)
    formData.append('last_name', updated_last_name)
    formData.append('location', updated_location)
    formData.append('bio', updated_bio)
    formData.append('phone', updated_phone_no)
    formData.append('birth_date', updated_birth_date)
    formData.append('personal_intrests', updated_personal_intrests)

    try {
      const response = await api.put(`${username.username}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      forceUpdate()
    } catch (err) {
      console.log(err.message)
    }
  }
  /* --------------------------
    Auth Update
  -----------------------------*/
  const { newEmailVal, newUsernameVal } = useRef()
  const newPasswdVal = useRef()
  const [newEmail, setNewEmail] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  //update email
  const [updateEmailError, setUpdateEmailError] = useState({})
  const updateEmail = async e => {
    e.preventDefault()

    if (validateEmailUpdate() === false) {
      return
    } else {
      try {
        const response = await api.put('update-email/', {
          email: newEmail
        })
        setUpdateEmailError(response.data)
        newEmailVal.current.value = ''
        setNewEmail(' ')
      } catch (err) {
        setUpdateEmailError(err.response.data)
      }
    }
  }

  const validateEmailUpdate = () => {
    const emailUpdateFail = !newEmail || newEmail == null
    if (emailUpdateFail) {
      setUpdateEmailError({ error: 'Enter new email' })
    } else {
      setUpdateEmailError({})
    }
    if (emailUpdateFail) {
      return false
    }
  }

  // update username
  const [usernameUpdatedError, setUsernameUpdateError] = useState({})
  const updateUsername = async e => {
    e.preventDefault()

    if (validateUsernameUpdate() === false) {
      return
    } else {
      try {
        const response = await api
          .put('update-username/', {
            username: newUsername
          })
          .then(() => navigate('/'))
          .then(() => localStorage.setItem('username', newUsername))
          .then(() => {
            forceUpdate()
          })
        setUsernameUpdateError(response.data)
        newUsernameVal.current.value = ''
        setNewUsername(' ')
      } catch (err) {
        setUsernameUpdateError(err.response.data)
      }
    }
  }

  const validateUsernameUpdate = () => {
    const usernameUpdateFail = !newUsername || newUsername === null
    if (usernameUpdateFail) {
      setUsernameUpdateError({ error: 'Enter new username!' })
    } else {
      setUsernameUpdateError('')
    }
    if (usernameUpdateFail) {
      return false
    }
  }

  //Update Password
  const [updatePasswdError, setPasswdError] = useState({})
  const updatePassword = async e => {
    e.preventDefault()

    if (validatePasswdupdate() === false) {
      return
    } else {
      try {
        const response = await api.put('update-password/', {
          password: newPassword
        })
        setPasswdError(response.data)
        newPasswdVal.current.value = ''
        setNewPassword(' ')
      } catch (err) {
        setPasswdError(err.response.data)
      }
    }
  }

  const validatePasswdupdate = () => {
    const passwdupdateFail = !newPassword || newPassword === null
    if (passwdupdateFail) {
      setPasswdError({ error: 'Enter new password!' })
    } else {
      setPasswdError({})
    }
    if (passwdupdateFail) {
      return false
    }
  }
  return (
    <div className='edit-profile-container'>
      <div className='edit-profile-form' id='myModal'>
        <h1>Update Your Profile</h1>

        <div className='update-profile-form'>
          <div className='current-profile'>
            <div className='current-profile-head'>
              <div className='current-profile-image'>
                <img src={profile.profile_pic} alt='' />
              </div>
              <div className='current-profile-head-content'>
                <p>{profile.full_name}</p>
                <p>{profile.user.email}</p>
                <p>{profile.user.username}</p>
              </div>
            </div>
            <div className='current-profile-content'>
              <div className='current-profile-section'>
                <p>Phone Number</p>
                <p className='current-profile-bio'>{profile.phone}</p>
              </div>
              <div className='current-profile-section'>
                <p>Bio</p>
                <p className='current-profile-bio'>{profile.bio} </p>
              </div>
              <div className='current-profile-section'>
                <p>Personal Intrests</p>
                <p className='current-profile-personal_intrests'>
                  {profile.personal_intrests}
                </p>
              </div>
              <div className='current-profile-sub-section'>
                <div className='current-profile-section'>
                  <p>Location</p>
                  <p className='current-profile-location'>{profile.location}</p>
                </div>
                <div className='current-profile-section'>
                  <p>Birth Date</p>
                  <p className='current-profile-birth_date'>
                    {profile.birth_date}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={e => UpdateProfile(e)}>
            <div className='section'>
              <div className='input-field'>
                <label htmlFor='first_name'>first name</label>
                <input
                  type='text'
                  id='first_name'
                  value={updated_first_name}
                  onChange={e => setFirstName(e.target.value)}
                  name='first_name'
                />
              </div>

              <div className='input-field'>
                <label htmlFor='last_name'>last name</label>
                <input
                  type='text'
                  id='last_name'
                  value={updated_last_name}
                  onChange={e => setLastName(e.target.value)}
                  name='last_name'
                />
              </div>
            </div>

            <div className='section'>
              <div className='input-field'>
                <label htmlFor='location'>location</label>
                <input
                  type='text'
                  value={updated_location}
                  onChange={e => SetLocation(e.target.value)}
                  id='location'
                  name='location'
                />
              </div>

              <div className='input-field'>
                <label htmlFor='bio'>bio</label>
                <input
                  type='text'
                  id='bio'
                  name='bio'
                  value={updated_bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
            </div>

            <div className='section'>
              <div className='input-field'>
                <label htmlFor='phone'>Phone number</label>
                <input
                  type='number'
                  id='phone'
                  name='phone'
                  value={updated_phone_no}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className='input-field'>
                <label htmlFor='birth_date'>birth date</label>
                <input
                  type='date'
                  id='birth_date'
                  name='birth_date'
                  value={updated_birth_date}
                  onChange={e => {
                    setBirthDate(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className='section'>
              <div className='input-field'>
                <label htmlFor='personal_intrests'>Personal intrests</label>
                <input
                  type='text'
                  id='personal_intrests'
                  name='personal_intrests'
                  value={updated_personal_intrests}
                  onChange={e => setPerosnalIntrests(e.target.value)}
                />
              </div>
              <div className='input-field'></div>
            </div>
            <button>Save</button>
          </form>
        </div>
        <a href='#auth-update' className='update-auth-link'>
          Change Password and Authentication Credentials
        </a>
        <div className='update-auth-form-container' id='auth-update'>
          <p>
            These are major security and authentication data's so please make
            sure to keep them safe, since they are the only way for you to
            access your account
          </p>

          <div className='update-auth-form-container-con'>
            <form className='update-auth-form' onSubmit={e => updateEmail(e)}>
              <h3>Change Email</h3>
              <div className='update-input-fields'>
                <div className='input-field'>
                  <input
                    style={
                      updateEmailError.error
                        ? { borderColor: 'rgba(255, 0, 0, 0.753)' }
                        : {}
                    }
                    type='email'
                    id='email'
                    name='email'
                    placeholder='New email'
                    onChange={e => setNewEmail(e.target.value)}
                    ref={newEmailVal}
                  />
                </div>
                <button type='submit'>Save</button>
              </div>
              {updateEmailError ? (
                <p
                  className={`${
                    updateEmailError.error ? 'error-message' : 'success-message'
                  }`}
                >
                  {updateEmailError.error
                    ? updateEmailError.error
                    : updateEmailError.success}
                </p>
              ) : (
                <></>
              )}
            </form>

            <form
              className='update-auth-form'
              onSubmit={e => updateUsername(e)}
            >
              <h3>Change Username</h3>
              <div className='update-input-fields'>
                <div className='input-field'>
                  <input
                    style={
                      usernameUpdatedError.error
                        ? { borderColor: 'rgba(255, 0, 0, 0.753)' }
                        : {}
                    }
                    type='text'
                    id='new-username'
                    name='new-username'
                    placeholder='New Username'
                    onChange={e => setNewUsername(e.target.value)}
                    ref={newUsernameVal}
                  />
                </div>

                <button type='submit'>Save</button>
              </div>
              {usernameUpdatedError ? (
                <p
                  className={`${
                    usernameUpdatedError.error
                      ? 'error-message'
                      : 'success-message'
                  }`}
                >
                  {usernameUpdatedError.error
                    ? usernameUpdatedError.error
                    : usernameUpdatedError.success}
                </p>
              ) : (
                ''
              )}
            </form>

            <form
              className='update-auth-form'
              onSubmit={e => updatePassword(e)}
            >
              <h3>Change Password</h3>
              <div className='update-input-fields'>
                <div className='input-field'>
                  <input
                    style={
                      updatePasswdError.error
                        ? { borderColor: 'rgba(255, 0, 0, 0.753)' }
                        : {}
                    }
                    type='password'
                    id='updated-password'
                    name='updated-password'
                    placeholder='New password'
                    ref={newPasswdVal}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>

                <button type='submit'>Save</button>
              </div>
              {updatePasswdError ? (
                <p
                  className={`${
                    updatePasswdError.error
                      ? 'error-message'
                      : 'success-message'
                  }`}
                >
                  {updatePasswdError.error
                    ? updatePasswdError.error
                    : updatePasswdError.success}
                </p>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
