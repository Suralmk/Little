import './App.css'
import React, { useEffect, useReducer } from 'react'

import Home from './Container/Home'
import CreatePost from './Container/CreatePost'
import Activity from './Container/Activity'
import OthersProfile from './Container/OthersProfile'
import PostUpdate from './Container/PostUpdate'
import ProfileEdit from './Container/ProfileEdit'
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate
} from 'react-router-dom'
import NotFound from './Container/NotFound'
import SearchResult from './Container/SearchResult'
import Layout from './Container/Layout'
import Loading from './Components/Loading'
import ToastContainer from './Container/ToastContainer'
// auth
import Login from './Container/Auth/Login'
import Signup from './Container/Auth/Signup'
import ResetPassword from './Container/Auth/ResetPassword'
import CreateNewPassword from './Container/Auth/CreateNewPasssword'
import ResetEmailSend from './Container/Auth/ResetEmailSend'
//global
import ProtectedRoute from './Core/ProtectedRoute'
import useGlobal from './Core/global'
function App () {
  const [renderProfile, forceUpdateProfile] = useReducer(x => x + 1, 0)
  const loading = useGlobal(state => state.loading)
  const authenticated = useGlobal(state => state.authenticated)
  const init = useGlobal(state => state.init)

  useEffect(() => {
    init()
    let onemin = 1000 * 60

    let timer = setInterval(() => {
      init()
    }, onemin * 4)

    return () => clearInterval(timer)
  }, [])

  return (
    <Router>
      <ToastContainer />
      {loading ? <Loading /> : <></>}
      <Routes>
        {authenticated ? (
          <Route path='/' element={<Layout />}>
            <Route
              path=''
              element={
                <ProtectedRoute>
                  <Home
                    forceUpdateProfile={forceUpdateProfile}
                    renderProfile={renderProfile}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post'
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path='/activity'
              element={
                <ProtectedRoute>
                  <Activity />
                </ProtectedRoute>
              }
            />
            <Route
              path={'/activity/:postId/edit'}
              element={
                <ProtectedRoute>
                  <PostUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/:username/'
              element={
                <ProtectedRoute>
                  <OthersProfile
                    renderProfile={renderProfile}
                    forceUpdateProfile={forceUpdateProfile}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile/:username/edit'
              element={
                <ProtectedRoute>
                  <ProfileEdit forceUpdateProfile={forceUpdateProfile} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/search'
              element={
                <ProtectedRoute>
                  <SearchResult />
                </ProtectedRoute>
              }
            />
          </Route>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route
              path='/reset-password/:uidb64/:token/'
              element={<CreateNewPassword />}
            />
            <Route path='/email-send' element={<ResetEmailSend />} />
            <Route path='/*' element={<Navigate to='/login' replace />} />{' '}
          </>
        )}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
