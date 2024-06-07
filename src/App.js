import './App.css'
import React from 'react'

import Home from './Container/Home'
import CreatePost from './Container/CreatePost'
import Message from './Container/Message'
import Activity from './Container/Activity'
import OthersProfile from './Container/OthersProfile'
import PostUpdate from './Container/PostUpdate'
import ProfileEdit from './Container/ProfileEdit'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import NotFound from './Container/NotFound'
import SearchResult from './Container/SearchResult'
import Layout from './Container/Layout'
import ProtectedRoute from './Core/ProtectedRoute'
// auth
import Login from './Container/Auth/Login'
import Signup from './Container/Auth/Signup'
import ResetPassword from './Container/Auth/ResetPassword'
import CreateNewPassword from './Container/Auth/CreateNewPasssword'
import ResetEmailSend from './Container/Auth/ResetEmailSend'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            path=''
            element={
              <ProtectedRoute>
                <Home />
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
            path='/message'
            element={
              <ProtectedRoute>
                <Message />
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
            path='/profile/:username'
            element={
              <ProtectedRoute>
                <OthersProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile/:username/edit'
            element={
              <ProtectedRoute>
                <ProfileEdit />
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
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/reset-password/:uidb64/:token'
          element={<CreateNewPassword />}
        />
        <Route path='/email-send' element={<ResetEmailSend />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
