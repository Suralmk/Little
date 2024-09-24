import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'

const Layout = () => {
  return (
    <div className=''>
      <div>
        <NavBar />
      </div>
      <div style={{ marginTop: 70 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
