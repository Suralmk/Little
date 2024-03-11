import './App.css'
import React, { useReducer } from 'react'
import NavBar from './Components/NavBar'
import Home from './Container/Home'
import CreatePost from './Container/CreatePost'
import Message from './Container/Message'
import Activity from './Container/Activity'
import OthersProfile from './Container/OthersProfile'
import PostUpdate from './Container/PostUpdate'
import ProfileEdit from './Container/ProfileEdit'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from './Config/config'
import NotFound from './Container/NotFound'
import SearchResult from './Container/SearchResult'

// auth
import Login from './Container/Auth/Login'
import Signup from './Container/Auth/Signup'
import ResetPassword from './Container/Auth/ResetPassword'
import CreateNewPassword from './Container/Auth/CreateNewPasssword'
import ResetEmailSend from './Container/Auth/ResetEmailSend'

function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  const fetchdata = async () => {
    try {
      const response = await api.get('session/')
      if (response.data) {
        const re = response.data
        setIsAuthenticated(re.isAuthenticated)
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])
  //Log out function
  const SubmitLogout = async () => {
    try {
      await api.post('logout/').then(() => {})
      setIsAuthenticated(false)
      localStorage.clear()
    } catch (err) {
      console.log(err.message)
    }
  }

  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('nav')
    navbar.classList.toggle('sticky', this.window.scrollY > 1)
  })

  return (
    <Router>
      <NavBar
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />

      <Routes>
        <Route
          path='/'
          element={
            <Home
              forceUpdate={forceUpdate}
              ignored={ignored}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* auth paths  */}
        <Route
          path='/login'
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              HomeUpdate={forceUpdate}
            />
          }
        />
        <Route path='/register' element={<Signup />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/reset-password/:uidb64/:token'
          element={<CreateNewPassword />}
        />
        <Route path='/email-send' element={<ResetEmailSend />} />

        <Route
          path='/post'
          element={<CreatePost isAuthenticated={isAuthenticated} />}
        />
        <Route path='/message' element={<Message />} />
        <Route path='/activity' element={<Activity />} />
        <Route path={'/activity/:postId/edit'} element={<PostUpdate />} />
        <Route path='/profile/:username' element={<OthersProfile />} />

        <Route
          path='/profile/:username/edit'
          element={<ProfileEdit forceUpdate={forceUpdate} />}
        />
        <Route path='/search' element={<SearchResult />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
