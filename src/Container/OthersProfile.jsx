import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { pyramids, side_bg, side_bg2, slide_3 } from '../assets'
import api from '../Config/config'

const OthersProfile = () => {
  const { username } = useParams()

  const location = useLocation()
  const [userData, setUserData] = useState([''])
  const [userPosts, setUserPosts] = useState([])

  const [curent_user, setCurrwntUser] = useState(
    localStorage.getItem('username')
  )
  const [followed, setFollowed] = useState(false)
  const [follow, setFollow] = React.useState(false)
  const [followValue, setFollowValue] = React.useState('')
  const followStatus = async () => {
    try {
      const response = await api.get(`/${curent_user.toLowerCase()}/follow/`)
      const followingStatus = response.data.following
      for (var i = 0; i < followingStatus.length; i++) {
        if (username === followingStatus[i].username) {
          setFollow(true)
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const followUser = () => {
    try {
      api.post(`/${curent_user.toLowerCase()}/follow/`, {
        follow: username
      })
      console.log(' you followed ' + username)
    } catch (err) {
      console.log(err.message)
    }
  }
  const unfollowUser = () => {
    try {
      api.put(`/${curent_user.toLowerCase()}/follow/`, {
        follow: username
      })
      console.log(' you unfollowed ' + username)
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchSingleUserData = async () => {
    try {
      const response = await api.get(`/users/${username.toLowerCase()}/`)
      setUserData(response.data)
      setUserPosts(response.data.posts)
    } catch (err) {
      console.log(err.message)
    }
  }

  const singleUserFollow = async () => {
    try {
      const re = await api.get(`/${username.toLowerCase()}/follow/`)
      setFollowValue(re.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    followStatus()
    fetchSingleUserData()
    singleUserFollow()
  }, [])

  return (
    <div className='others-profile-container'>
      <div className='others-profile-wrapper'>
        <div className='others-profile'>
          <div className='others-profile-bg-image'>
            <img src={userData.bg_pic} alt='' />
          </div>
          <div className='others-profile-profile-image'>
            <img src={userData.profile_pic} alt='' />
          </div>

          <div className='others-profile-content'>
            <div className='others-profile-name'>
              <h2>{userData.full_name}</h2>
              {username === localStorage.getItem('username') ? (
                <Link
                  to={username ? `/profile/${username}/edit` : 'not-found'}
                  state={{ profile: location.state.profile }}
                >
                  <FaEdit /> Edit Profile
                </Link>
              ) : (
                ''
              )}
            </div>
            <div className='others-profile-bio'>
              <p>{userData.bio ? userData.bio : ''}</p>
            </div>
            <div className='others-profile-personal-intrests'>
              <p>
                {userData.personal_intrests !== 'null'
                  ? userData.personal_intrests
                  : ''}
              </p>
            </div>
            <div className='others-profile-location'>
              <p>{userData.location}</p>
            </div>
            <div className='others-profile-follow'>
              {/* {followValue.fo ? (
                <></>
              ) : (
                <>
                  <p>follwer {followValue.follower.length}</p>
                  <p>following {followValue.following.lenght}</p>
                </>
              )} */}
              {username === localStorage.getItem('username') ||
              curent_user === null ? (
                ' '
              ) : (
                <React.Fragment>
                  {follow ? (
                    <Link
                      className='other-profile-follow-link'
                      onClick={() => {
                        unfollowUser()
                        setFollow(!follow)
                      }}
                    >
                      UnFollow
                    </Link>
                  ) : (
                    <Link
                      className='other-profile-follow-link'
                      onClick={() => {
                        followUser()
                        setFollow(!follow)
                      }}
                    >
                      Follow
                    </Link>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>

        <div className='others-profile-activities'>
          <h2 className='others-profile-activities-header'>
            Posts of <span>{userData.full_name}</span>
          </h2>
          <div className='others-profile-activities-posts'>
            {userPosts.map((post, id) => (
              <div key={id} className='others-profile-activities-post'>
                <img src={post.picture} alt='' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OthersProfile
