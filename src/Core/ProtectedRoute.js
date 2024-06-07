// src/components/ProtectedRoute.js

import React, { useState } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import useGlobal from './global'

const ProtectedRoute = ({ children }) => {
  //const authenticated = useGlobal(state => state.authenticated)
  const [authenticated, setAuthenticated] = useState(true)
  if (!authenticated) {
    return <Navigate to='/login' />
  }

  return children
}

export default ProtectedRoute
