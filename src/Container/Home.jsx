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
import ProfileSkeleton from '../Components/Skeletons/ProfileSkeleton'

const Home = ({ forceUpdateProfile, renderProfile }) => {
  const user = useGlobal(state => state.user)

  const addToast = useGlobal(state => state.addToast)
  const logout = useGlobal(state => state.logout)
  const updateProfile = useGlobal(state => state.updateProfile)

  const token = JSON.parse(localStorage.getItem('tokens'))

  const [showFollowerModal, setshowFollowerModal] = useState(false)
  const [showFollowingModal, setshowFollowingModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [profile, setProfile] = useState({})
  const [profileloading, setProfileLoading] = useState(true)
  const [postLoading, setPostLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = async page => {
    try {
      const response = await api.get(`posts/?page=${page}`)
      setPosts([...posts, ...response.data.results])
      setHasMore(response.data.next !== null)
    } catch (err) {
      addToast(`${err.message}`, 'failure')
    } finally {
      setPostLoading(false)
    }
  }
  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const fetchCurrentUserProfile = async () => {
    try {
      const res = await api.get(`/${user.profile.user.username}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access}`
        }
      })
      setProfile(res.data)
      updateProfile(res.data)
    } catch (err) {
      console.log(err)
      logout()
    }
  }
  useEffect(() => {
    setTimeout(() => {
      fetchCurrentUserProfile().then(() => setProfileLoading(false))
    }, 1000)
  }, [renderProfile])

  useEffect(() => {
    setTimeout(() => {
      fetchPosts(currentPage)
    }, 1000)
  }, [currentPage])

  return (
    <div className='home-page'>
      <div className='home-profile' id='home-profile'>
        {profileloading ? (
          <ProfileSkeleton />
        ) : (
          <Profile
            openFollowerModal={setshowFollowerModal}
            followerModal={showFollowerModal}
            openFollowingModal={setshowFollowingModal}
            followingModal={showFollowingModal}
            forceUpdateProfile={forceUpdateProfile}
            renderProfile={renderProfile}
            profile={profile}
          />
        )}

        <Follower
          closeFollowerModal={setshowFollowerModal}
          open={showFollowerModal}
          followers={profile.follower}
        />

        <Following
          open={showFollowingModal}
          closeFollowingModal={setshowFollowingModal}
          followings={profile.following}
        />

        <Premium premium={profile?.user?.premium} />
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
              <Posts post={posts} key={id} />
            ))}
          </>
        )}
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}
        >
          {hasMore && (
            <button
              style={{
                border: '0.5px black solid'
              }}
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <div className='home-additional' id='home-additional'>
        <div className='home-ad' id='home-ad'>
          <Ad />
        </div>
        <div className='home-suggestion' id='home-sugg'>
          <Suggestion forceUpdateProfile={forceUpdateProfile} />
        </div>
      </div>
    </div>
  )
}

export default Home
