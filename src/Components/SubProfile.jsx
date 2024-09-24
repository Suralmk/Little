import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { api } from '../Core/config'
import useGlobal from '../Core/global'
const SubProfile = ({ suggestion, forceUpdateProfile }) => {
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [follow, setFollow] = React.useState(false)
  const user = useGlobal(state => state.user)
  const followUser = async username => {
    try {
      await api.post(
        `/${user.profile.user.username.toLowerCase()}/follow-status/`,
        {
          follow: username
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access}`
          }
        }
      )
      forceUpdateProfile()
    } catch (err) {
      console.log(err.message)
    }
  }

  const unfollowUser = async username => {
    try {
      await api.put(
        `/${user.profile.user.username.toLowerCase()}/follow-status/`,
        {
          follow: username
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access}`
          }
        }
      )
      forceUpdateProfile()
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className='sugg-people-profile'>
      <div className='sugg-people-pro '>
        <div className='sugg-profile-pic'>
          <img src={suggestion.profile_pic} alt='' />
        </div>
        <div className='sug-profile-info'>
          <p>{suggestion.full_name}</p>
          <p className='profile-bio-text'>{suggestion?.bio}</p>

          <React.Fragment>
            {follow ? (
              <Link
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  unfollowUser(suggestion.username)
                  setFollow(!follow)
                }}
              >
                UnFollow
              </Link>
            ) : (
              <Link
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  followUser(suggestion.username)
                  setFollow(!follow)
                }}
              >
                Follow
              </Link>
            )}
          </React.Fragment>
        </div>
      </div>
    </div>
  )
}

export default SubProfile
