import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FaEdit, FaPlus } from 'react-icons/fa'
import useGlobal from '../Core/global'
import { api } from '../Core/config'
import ChangeBgPic from '../Components/Modals/ChangeBgPic'
import ChangeProfilePic from '../Components/Modals/ChangeProfilePic'
import { PiSealCheckLight } from 'react-icons/pi'

const OthersProfile = ({ renderProfile, forceUpdateProfile }) => {
  const user = useGlobal(state => state.user)
  const { username } = useParams()
  const navigate = useNavigate()

  const [userData, setUserData] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const [follow, setFollow] = useState(false)
  const token = JSON.parse(localStorage.getItem('tokens'))

  const [changeProfilePicModal, setchangeProfilePicModal] = useState(false)
  const [changeBgPicModal, setChangeBgPicModal] = useState(false)

  // Follow user function
  const followUser = async () => {
    try {
      await api.post(
        `/${user.profile.user.username.toLowerCase()}/follow-status/`,
        { follow: username },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access}`
          }
        }
      )
      forceUpdateProfile()
    } catch (err) {
      console.error('Error following user:', err.message)
    }
  }

  // Unfollow user function
  const unfollowUser = async () => {
    try {
      await api.put(
        `/${user.profile.user.username.toLowerCase()}/follow-status/`,
        { follow: username },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access}`
          }
        }
      )
      forceUpdateProfile()
    } catch (err) {
      console.error('Error unfollowing user:', err.message)
    }
  }

  // Fetch user data
  const fetchSingleUserData = async () => {
    try {
      const response = await api.get(`/users/${username.toLowerCase()}/`)
      setUserData(response.data)
      setUserPosts(response.data.posts || [])
    } catch (err) {
      console.error('Error fetching user data:', err.message)
      navigate('/not-found')
    }
  }

  // Check follow status
  const followStatus = async () => {
    try {
      const response = await api.get(
        `/${user.profile.user.username}/follow-status/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access}`
          }
        }
      )
      const followingStatus = response.data.following
      setFollow(followingStatus.some(f => f.username === username))
    } catch (err) {
      console.error('Error fetching follow status:', err.message)
    }
  }

  useEffect(() => {
    fetchSingleUserData()
    followStatus()
  }, [renderProfile, username])

  console.log(userData)
  return (
    <React.Fragment>
      <div className='others-profile-container'>
        <div className='others-profile-wrapper'>
          <div className='others-profile'>
            <div className='others-profile-bg-image'>
              <img src={userData.bg_pic} alt='' />
              {username === user.profile.user.username && (
                <div
                  className='bg-pic-edit'
                  onClick={() => setChangeBgPicModal(!changeBgPicModal)}
                >
                  <span>
                    <FaEdit />
                  </span>
                  Edit
                </div>
              )}
            </div>
            <div className='others-profile-profile-image'>
              {username === user.profile.user.username && (
                <div
                  className='profile-image-edit-plus'
                  onClick={() =>
                    setchangeProfilePicModal(!changeProfilePicModal)
                  }
                >
                  <FaPlus size={15} />
                </div>
              )}
              <img src={userData.profile_pic} alt='' />
            </div>

            <div className='others-profile-content'>
              <div className='others-profile-name'>
                <h2>
                  {userData.full_name}{' '}
                  {userData.premium && (
                    <PiSealCheckLight
                      size={20}
                      color='rgba(35, 11, 143, 0.658)'
                    />
                  )}
                </h2>
                {username === user.profile.user.username && (
                  <Link to={`/profile/${username}/edit`}>
                    <FaEdit /> Edit Profile
                  </Link>
                )}
              </div>
              <div className='others-profile-bio'>
                <p>{userData.bio || ''}</p>
              </div>
              <div className='others-profile-personal-intrests'>
                <p>{userData.personal_intrests || ''}</p>
              </div>
              <div className='others-profile-location'>
                <p>{userData.location}</p>
              </div>
              <div className='others-profile-follow'>
                {username !== user.profile.user.username && (
                  <React.Fragment>
                    {follow ? (
                      <Link
                        className='other-profile-follow-link'
                        onClick={() => {
                          unfollowUser()
                          setFollow(false)
                        }}
                      >
                        UnFollow
                      </Link>
                    ) : (
                      <Link
                        className='other-profile-follow-link'
                        onClick={() => {
                          followUser()
                          setFollow(true)
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
      <ChangeProfilePic
        open={changeProfilePicModal}
        closeChnageProfilePic={setchangeProfilePicModal}
        profile_pic={userData.profile_pic}
        forceUpdateProfile={forceUpdateProfile}
      />
      <ChangeBgPic
        open={changeBgPicModal}
        closeChangeBgPic={setChangeBgPicModal}
        bg_pic={userData.bg_pic}
        forceUpdateProfile={forceUpdateProfile}
      />
    </React.Fragment>
  )
}

export default OthersProfile
