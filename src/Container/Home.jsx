import React from 'react'
import Posts from '../Components/Posts'
import Profile from '../Components/Profile'
import Suggestion from '../Components/Suggestion'
import Ad from '../Components/Ad'
import Follower from '../Components/Modals/Follower'
import Premium from '../Components/Premium'
import Following from '../Components/Modals/Following'
import api from '../Config/config'
import { useState, useEffect, useReducer } from 'react'

const Home = ({ ignored, forceUpdate, isAuthenticated }) => {
  const [posts, setPosts] = useState([])
  const [userData, SetUserData] = useState(localStorage.getItem('username'))
  const [profile, setProfile] = useState([])
  const [updateProfile, forceUpdatePro] = useReducer(x => x + 1, 0)

  const fetchPosts = async () => {
    try {
      const response = await api.get('posts/')
      const data = response.data
      setPosts(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/${userData.toLowerCase()}/`)
      const data = response.data
      setProfile(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchProfile()
  }, [ignored, updateProfile])

  const [editProfile, setEditProfile] = useState(false)
  const [showFollowerModal, setshowFollowerModal] = useState(false)
  const [showFollowingModal, setshowFollowingModal] = useState(false)

  return (
    <div className='home-page'>
      <div className='home-profile' id='home-profile'>
        {isAuthenticated
          ? profile.map((pro, id) => (
              <Profile
                pro={pro}
                OpEditProfile={setEditProfile}
                editProfile={editProfile}
                openFollowerModal={setshowFollowerModal}
                followerModal={showFollowerModal}
                followingModal={showFollowingModal}
                openFollowingModal={setshowFollowingModal}
                key={id}
                forceUpdatePro={forceUpdatePro}
              />
            ))
          : ''}

        {profile.map((pro, id) => (
          <Follower
            open={showFollowerModal}
            closeFollowerModal={setshowFollowerModal}
            followers={pro.follower}
            key={id}
          />
        ))}

        {profile.map((pro, id) => (
          <Following
            open={showFollowingModal}
            closeFollowingModal={setshowFollowingModal}
            followings={pro.following}
            key={id}
          />
        ))}

        <Premium />
      </div>
      <div className='home-posts'>
        {posts.map((posts, id) => (
          <Posts post={posts} forceUpdatePro={forceUpdatePro} key={id} />
        ))}
      </div>
      <div className='home-additional' id='home-additional'>
        <div className='home-ad' id='home-ad'>
          <Ad />
        </div>
        <div className='home-suggestion' id='home-sugg'>
          <Suggestion />
        </div>
      </div>
    </div>
  )
}

export default Home
