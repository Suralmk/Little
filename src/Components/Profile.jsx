import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { side_bg2, side_bg } from '../assets'
import api from '../Config/config'
import ChangeProfilePic from './Modals/ChangeProfilePic'
import ChangeBgPic from './Modals/ChangeBgPic'
import useGlobal from '../Core/global'
const Profile = ({
  openFollowerModal,
  followerModal,
  followingModal,
  openFollowingModal,
  forceUpdatePro
}) => {
  const [changeProfilePicModal, setchangeProfilePicModal] = useState(false)
  const [changeBgPicModal, setChangeBgPicModal] = useState(false)

  const user = useGlobal(state => state.user)

  return (
    <React.Fragment>
      <div className='profile' id='profile'>
        <div className='profile-bg-pic'>
          <img src={user.profile.bg_pic} alt='' />
          <div
            className='bg-pic-edit'
            onClick={() => setChangeBgPicModal(!changeBgPicModal)}
          >
            <span>
              <FaEdit />
            </span>
            Edit
          </div>
        </div>
        <div className='profile-pic'>
          <img src={user.profile.profile_pic} alt='' />
          <div
            className='profile-image-edit-plus'
            onClick={() => setchangeProfilePicModal(!changeProfilePicModal)}
          >
            <FaPlus size={15} />
          </div>
        </div>
        <div className='profile-name'>
          <Link to={`/profile/`}>{user.profile.full_name}</Link>
        </div>
        <div className='profile-bio'>
          <p>{user.profile.user.username}</p>
        </div>
        <div className='profile-bio'>
          <p>{user.profile.bio}</p>
        </div>
        <div className='profile-bio'>
          <p>{user.profile.personal_intrests}</p>
        </div>
        <div className='profile-bio'>
          <p>{user.profile.location}</p>
        </div>
        <div className='profile-hashtags'>
          <p>#ai #Linkedin #django #django-restframework #web-deveopment</p>
        </div>
        <div className='profile-status'>
          <div className='profile-follower'>
            <Link
              onClick={() => {
                openFollowerModal(!followerModal)
              }}
            >
              followers
            </Link>{' '}
            {user.profile.follower.length}
          </div>
          <div className='profile-follower'>
            <Link
              onClick={() => {
                openFollowingModal(!followingModal)
              }}
            >
              Following{' '}
            </Link>{' '}
            {user.profile.following.length}
          </div>
        </div>
        <div className='profile-activity'>
          <Link to='/activity'>Activity</Link>
        </div>
        <hr style={{ margin: '10px 0' }} />
        <div className='profile-hashtags'>
          <Link>Follow Hashtags</Link>
          <Link>
            <FaPlus />
          </Link>
        </div>
      </div>
      <ChangeProfilePic
        open={changeProfilePicModal}
        closeChnageProfilePic={setchangeProfilePicModal}
        profile_pic={user.profile.profile_pic}
        forceUpdatePro={forceUpdatePro}
      />
      {/* <ChangeBgPic
        open={changeBgPicModal}
        closeChangeBgPic={setChangeBgPicModal}
        bg_pic={pro.bg_pic}
        username={pro.user.username}
        forceUpdatePro={forceUpdatePro}
      /> */}
    </React.Fragment>
  )
}

export default Profile
