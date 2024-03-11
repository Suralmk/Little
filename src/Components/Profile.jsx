import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit } from 'react-icons/fa'
import api from '../Config/config'
import ChangeProfilePic from './Modals/ChangeProfilePic'
import ChangeBgPic from './Modals/ChangeBgPic'

const Profile = ({
  pro,
  openFollowerModal,
  followerModal,
  followingModal,
  openFollowingModal,
  forceUpdatePro
}) => {
  const [changeProfilePicModal, setchangeProfilePicModal] = useState(false)
  const [changeBgPicModal, setChangeBgPicModal] = useState(false)

  return (
    <React.Fragment>
      <div className='profile' id='profile'>
        <div className='profile-bg-pic'>
          <img src={pro.bg_pic} alt='' />
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
          <img src={pro.profile_pic} alt='' />
          <div
            className='profile-image-edit-plus'
            onClick={() => setchangeProfilePicModal(!changeProfilePicModal)}
          >
            <FaPlus size={15} />
          </div>
        </div>
        <div className='profile-name'>
          <Link
            state={{ profile: pro }}
            to={`/profile/${localStorage.getItem('username').toLowerCase()}/`}
          >
            {pro.full_name}
          </Link>
        </div>
        <div className='profile-bio'>
          <p>{pro.username}</p>
        </div>
        <div className='profile-bio'>
          <p>{pro.bio}</p>
        </div>
        <div className='profile-bio'>
          <p>{pro.personal_intrests}</p>
        </div>
        <div className='profile-bio'>
          <p>{pro.phone_no}</p>
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
              followers{' '}
            </Link>{' '}
            {pro.follower.length}
          </div>
          <div className='profile-follower'>
            <Link
              onClick={() => {
                openFollowingModal(!followingModal)
              }}
            >
              Following{' '}
            </Link>{' '}
            {pro.following.length}
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
        profile_pic={pro.profile_pic}
        username={pro.user.username}
        forceUpdatePro={forceUpdatePro}
      />
      <ChangeBgPic
        open={changeBgPicModal}
        closeChangeBgPic={setChangeBgPicModal}
        bg_pic={pro.bg_pic}
        username={pro.user.username}
        forceUpdatePro={forceUpdatePro}
      />
    </React.Fragment>
  )
}

export default Profile
