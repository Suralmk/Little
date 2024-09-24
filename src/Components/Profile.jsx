import React from 'react'
import { Link } from 'react-router-dom'
import { PiSealCheckLight } from 'react-icons/pi'
import useGlobal from '../Core/global'
const Profile = ({
  openFollowerModal,
  followerModal,
  followingModal,
  openFollowingModal,
  profile
}) => {
  const user = useGlobal(state => state.user)
  return (
    <React.Fragment>
      <div className='profile' id='profile'>
        <div className='profile-bg-pic'>
          <img src={profile?.bg_pic} alt='' />
        </div>
        <div className='profile-pic'>
          <img src={profile?.profile_pic} alt='' />
        </div>
        <div className='profile-name'>
          <Link
            to={`/profile/${user.profile.user.username}/`}
            state={{ username: user.profile.user.username, profile: profile }}
          >
            {profile?.full_name}
          </Link>
          {user.profile.user.premium && (
            <PiSealCheckLight size={20} color='rgba(35, 11, 143, 0.658)' />
          )}
        </div>
        <div className='profile-bio'>
          <p>{profile?.user?.username}</p>
        </div>
        <div className='profile-bio'>
          <p>{profile?.bio}</p>
        </div>
        <div className='profile-bio'>
          <p>{profile?.personal_intrests}</p>
        </div>
        <div className='profile-bio'>
          <p>{profile?.location}</p>
        </div>
        {/* <div className='profile-hashtags'>
          <p>#ai #Linkedin #django #django-restframework #web-deveopment</p>
        </div> */}
        <div className='profile-status'>
          <div className='profile-follower'>
            <Link
              onClick={() => {
                openFollowerModal(!followerModal)
              }}
            >
              followers
            </Link>{' '}
            {profile?.follower?.length}
          </div>
          <div className='profile-follower'>
            <Link
              onClick={() => {
                openFollowingModal(!followingModal)
              }}
            >
              Following{' '}
            </Link>{' '}
            {profile?.following?.length}
          </div>
        </div>
        <div className='profile-activity'>
          <Link to='/activity'>Activity</Link>
        </div>
        <hr style={{ margin: '10px 0' }} />
        {/* <div className='profile-hashtags'>
          <Link>Follow Hashtags</Link>
          <Link>
            <FaPlus />
          </Link>
        </div> */}
      </div>
    </React.Fragment>
  )
}

export default Profile
