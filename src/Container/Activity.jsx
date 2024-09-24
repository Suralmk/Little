import React, { useEffect, useReducer, useState, useRef } from 'react'
import MyPost from '../Components/MyPost'
import { api } from '../Core/config'
import useGlobal from '../Core/global'

const Activity = () => {
  const [myPost, setMyPost] = useState([])
  const [updatePost, forceUpdate] = useReducer(x => x + 1, 0)
  const [followings, setFollowings] = useState([])
  const token = JSON.parse(localStorage.getItem('tokens'))
  const user = useGlobal(state => state.user)

  const fetchMyPosts = async () => {
    const response = await api.get(`posts/user/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access}`
      }
    })
    setMyPost(response.data)
  }

  const fetchMyFollowings = async () => {
    try {
      var response = await api.get(
        `${user.ptofile.user.username.toLowerCase()}/follow/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access}`
          }
        }
      )
      setFollowings(response.data?.following)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchMyPosts()
    // fetchMyFollowings()
  }, [updatePost])




  return (
    <React.Fragment>
      <div className='activty-container'>
        <div className='activty-wrapper'>
          <div className='activities'>
            <div className='my-posts-container'>
              <h1>Posts</h1>
              {myPost.length !== 0 ? (
                myPost.map((post, id) => (
                  <MyPost post={post} forceUpdate={forceUpdate} key={id} />
                ))
              ) : (
                <div className='no-data-found'>
                  <p>You currently have no post! </p>
                </div>
              )}
            </div>
            <div className='following-activity'>
              <h1>Following </h1>
              <div className='follower-container'>
                {followings.length !== 0 ? (
                  followings.map((following, id) => (
                    <div className='follower-section' key={id}>
                      <div className='follower-profile-image'>
                        <img src={following.profile_pic} alt='' />
                      </div>
                      <div className='follower-profile-content'>
                        <p className='follower-name'>{following.full_name}</p>
                        <p className='follower-bio'>{following.username}</p>
                        <p className='follower-bio'>{following.bio}</p>
                      </div>
                      {/* <p className='follower-follow-back'>Follow back</p> */}
                    </div>
                  ))
                ) : (
                  <div className='no-data-found'>
                    <p>You are not following anyone! </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Activity
