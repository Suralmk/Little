import React from 'react'
import Posts from '../Components/Posts'
import Profile from '../Components/Profile'
import Suggestion from '../Components/Suggestion'
import Ad from '../Components/Ad'
import Follower from '../Components/Modals/Follower'
import Premium from '../Components/Premium'
import Following from '../Components/Modals/Following'
import { api } from '../Core/config'
import useGlobal from '../Core/global'
import { useState, useEffect, useReducer } from 'react'
import SkeletonPostsLoading from '../Components/SkeletonLoaderPosts'

const Home = ({ ignored }) => {
  const [posts, setPosts] = useState([])
  const [updateProfile, forceUpdatePro] = useReducer(x => x + 1, 0)
  const setLoading = useGlobal(state => state.setLoading)
  const user = useGlobal(state => state.user)
  const addToast = useGlobal(state => state.addToast)
  const postLoading = useGlobal(state => state.postLoading)
  const setPostLoading = useGlobal(state => state.setPostLoading)

  const fetchPosts = async () => {
    try {
      const response = await api.get('posts/')
      const data = response.data
      setPosts(data)
      setPostLoading(false)
    } catch (err) {
      console.log(err.message)
      addToast(`${err.message}`, 'failure')
    }
  }

  useEffect(() => {
    setPostLoading(true)
    fetchPosts()
  }, [ignored])

  const [editProfile, setEditProfile] = useState(false)
  const [showFollowerModal, setshowFollowerModal] = useState(false)
  const [showFollowingModal, setshowFollowingModal] = useState(false)

  return (
    <div className='home-page'>
      <div className='home-profile' id='home-profile'>
        <Profile
          openFollowerModal={setshowFollowerModal}
          followerModal={showFollowerModal}
          openFollowingModal={setshowFollowingModal}
          followingModal={showFollowingModal}
        />

        <Follower
          closeFollowerModal={setshowFollowerModal}
          open={showFollowerModal}
          followers={user.profile.follower}
        />

        <Following
          open={showFollowingModal}
          closeFollowingModal={setshowFollowingModal}
          followings={user.profile.following}
        />

        <Premium />
      </div>
      <div className='home-posts'>
        {postLoading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 15
            }}
          >
            <SkeletonPostsLoading />
            <SkeletonPostsLoading />
            <SkeletonPostsLoading />
          </div>
        ) : (
          <>
            {posts.map((posts, id) => (
              <Posts post={posts} forceUpdatePro={forceUpdatePro} key={id} />
            ))}
          </>
        )}
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
