import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'

const Layout = () => {
  return (
    <div className='flex flex-col'>
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
