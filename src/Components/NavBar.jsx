import React, { useRef, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../Config/config'
import { PiXLight, PiMagnifyingGlassLight, PiListBold } from 'react-icons/pi'
import {
  FaCaretDown,
  FaCaretUp,
  FaHome,
  FaCommentAlt,
  FaPlus
} from 'react-icons/fa'
import SearchResult from '../Container/SearchResult'
const NavBar = ({ setIsAuthenticated, isAuthenticated, user }) => {
  const navigate = useNavigate()
  const searchedVal = useRef()
  const [profilearrow, setProFileArrow] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [me, setMe] = useState(false)

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

  const [searchedText, setSearchedText] = useState('')
  const [searchedResult, setSearchedResult] = useState()

  const performSerach = async e => {
    e.preventDefault()

    // try {
    //   const response = await api.get(`/users/?search=${searchedText}`)
    //   setSearchedResult(response.data)
    //   setMobileMenu(false)
    //   searchedVal.current.value = ''
    //   console.log(searchedResult)
    //   //navigate(`/search`, { state: searchedResult })
    // } catch (err) {
    //   console.log(err.response.data.error)

    //   setSearchError({ error: `No results for ${searchedText}` })
    // }
  }

  return (
    <div className='nav ' id='nav'>
      <Link
        to='/'
        style={{
          marginLeft: '10px'
        }}
      >
        <h1
          style={{
            fontSize: '40px'
          }}
        >
          {' '}
          little
        </h1>
      </Link>
      <ul className='d_flex moniter-menu'>
        <li className='fd_flex'>
          <NavLink
            to='/'
            className='fd_flex'
            style={({ isActive }) => {
              return isActive ? { color: 'rgba(35, 11, 143, 0.318)' } : {}
            }}
          >
            {' '}
            <h4>
              <FaHome />
            </h4>
            <h4> Home</h4>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/post'
            className='fd_flex'
            style={({ isActive }) => {
              return isActive ? { color: 'rgba(35, 11, 143, 0.318)' } : {}
            }}
          >
            <h4>
              <FaPlus />
            </h4>
            <h4>Post</h4>
          </NavLink>
        </li>

        <li className='me'>
          <NavLink
            onClick={() => {
              setProFileArrow(!profilearrow)
              setMe(!me)
            }}
          >
            Me
            {profilearrow ? (
              <React.Fragment>
                <FaCaretUp />{' '}
              </React.Fragment>
            ) : (
              <FaCaretDown />
            )}
          </NavLink>
          <ul className={me ? `show-me-menu me-menu` : 'me-menu'}>
            {isAuthenticated ? (
              <li>
                <NavLink to='/' onClick={SubmitLogout}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <React.Fragment>
                <li>
                  <Link to='/login' onClick={() => setMe(!me)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to='/register' onClick={() => setMe(!me)}>
                    Sign Up
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </li>

        <li className='search-list'>
          <form onSubmit={e => performSerach(e)}>
            <div className='input-field'>
              <input
                type='text'
                onChange={e => setSearchedText(e.target.value)}
                ref={searchedVal}
                name='searchd'
                placeholder='Search'
              />
              <PiMagnifyingGlassLight size={21} className='search-icon' />
            </div>
            <button type='submit' hidden className='search-btn'>
              Search
            </button>
          </form>
        </li>
      </ul>

      <PiListBold
        size={30}
        className='mobile-menu-btn'
        onClick={() => setMobileMenu(!mobileMenu)}
      />
      {mobileMenu && (
        <>
          <ul className='d_flex mobile-menu'>
            <PiXLight
              size={30}
              className='mobile-menu-btn-close'
              onClick={() => setMobileMenu(!mobileMenu)}
            />
            <li>
              <NavLink
                to='/'
                className='d_flex'
                style={({ isActive }) => {
                  return isActive ? { color: 'rgba(35, 11, 143, 0.318)' } : {}
                }}
              >
                {' '}
                <h4>
                  <FaHome />
                </h4>
                <h4> Home</h4>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/post'
                className='d_flex'
                style={({ isActive }) => {
                  return isActive ? { color: 'rgba(35, 11, 143, 0.318)' } : {}
                }}
              >
                <h4>
                  <FaPlus />
                </h4>
                <h4>Post</h4>
              </NavLink>
            </li>

            {isAuthenticated ? (
              <li>
                <NavLink to='/' onClick={SubmitLogout}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <React.Fragment>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Sign Up</Link>
                </li>
              </React.Fragment>
            )}
            <li className='search-list'>
              <form onSubmit={e => performSerach(e)}>
                <div className='input-field'>
                  <input
                    type='text'
                    name='searched'
                    onChange={e => setSearchedText(e.target.value)}
                    ref={searchedVal}
                    placeholder='Search'
                  />
                  <PiMagnifyingGlassLight size={21} className='search-icon' />
                </div>
                <button type='submit' hidden className='search-btn'>
                  Search
                </button>
              </form>
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

export default NavBar
