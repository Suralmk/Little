import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { api } from '../Core/config'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { PiPlusBold, PiHouseBold } from 'react-icons/pi'
import SearchResult from './Modals/SearchResult'
import useGlobal from '../Core/global'
const NavBar = () => {
  const searchedVal = useRef()
  const [profilearrow, setProFileArrow] = useState(false)
  const [me, setMe] = useState(false)
  const { logout, user } = useGlobal()

  const [mobileSearch, setMobileSearch] = useState(false)
  const handleLogout = () => {
    logout()
    setMe(!me)
  }

  const [searchedText, setSearchedText] = useState('')
  const [showSearchResult, setShowSearchResult] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchResult, setSearchResult] = useState([])

  const performSerach = async text => {
    setShowSearchResult(true)
    setLoading(true)
    try {
      const response = await api.get(`/users/search/?search=${text}`)
      setSearchResult(response.data)
    } catch (err) {
      console.log(err)
      setSearchedText('')
    }
    setLoading(false)
  }

  const meRef = useRef()
  const meMobRef = useRef()

  useEffect(() => {
    const handleOutsideClick = event => {
      // Close modal if click is outside of menuRef
      if (
        meRef.current ||
        (meMobRef.current && !meRef.current.contains(event.target)) ||
        !meMobRef.current.contains(event.target)
      ) {
        setMe(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])
  return (
    <React.Fragment>
      <div className='nav ' id='nav'>
        <Link
          to='/'
          style={{
            marginLeft: '10px'
          }}
        >
          <h1 className='web-logo'>little</h1>
        </Link>
        <ul className='d_flex moniter-menu'>
          <li className='fd_flex'>
            <NavLink
              to='/'
              className='fd_flex'
              style={({ isActive }) => {
                return isActive ? { color: 'rgba(35, 11, 143, 0.5)' } : {}
              }}
            >
              {' '}
              <h4>
                <PiHouseBold size={20} />
              </h4>
              <h4> Home</h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/post'
              className='fd_flex'
              style={({ isActive }) => {
                return isActive ? { color: 'rgba(35, 11, 143, 0.5)' } : {}
              }}
            >
              <h4>
                <PiPlusBold size={20} />
              </h4>
              <h4>Post</h4>
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to='/message'
              className='fd_flex'
              style={({ isActive }) => {
                return isActive ? { color: 'rgba(35, 11, 143, 0.318)' } : {}
              }}
            >
              <h4>
                <PiChatBold size={20} />
              </h4>
              <h4>Message</h4>
            </NavLink>
          </li> */}

          <li className='me'>
            <NavLink
              onClick={() => {
                setProFileArrow(!profilearrow)
                setMe(!me)
              }}
            >
              <img
                src={user.profile.profile_pic || ''}
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </NavLink>
            <ul ref={meRef} className={me ? `show-me-menu me-menu` : 'me-menu'}>
              <li style={{ width: '100%', display: 'flex' }}>
                <Link
                  style={{ width: '100%' }}
                  onClick={() => {
                    setMe(!me)
                  }}
                >
                  Profile
                </Link>
              </li>
              <li style={{ width: '100%', display: 'flex' }}>
                <Link style={{ width: '100%' }} onClick={() => handleLogout()}>
                  Log Out
                </Link>
              </li>
            </ul>
          </li>

          <li className='search-list'>
            <form>
              <div className='input-field'>
                <input
                  type='text'
                  onChange={e => {
                    if (e.target.value === '' || e.target.value === null) {
                      setShowSearchResult(false)
                    } else {
                      setSearchedText(e.target.value)
                      performSerach(e.target.value)
                    }
                  }}
                  ref={searchedVal}
                  name='searchd'
                  placeholder='Search'
                />
              </div>
              <button type='submit' hidden className='search-btn'>
                Search
              </button>
            </form>
          </li>
        </ul>

        {
          <>
            <ul className='d_flex mobile-menu'>
              <li>
                <NavLink
                  to='/'
                  className='d_flex'
                  style={({ isActive }) => {
                    return isActive ? { color: 'rgba(35, 11, 143, 0.318)' } : {}
                  }}
                >
                  <h4>
                    <PiHouseBold size={20} />
                  </h4>
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
                    <PiPlusBold size={20} />
                  </h4>
                </NavLink>
              </li>

              <li className='search-list'>
                <form>
                  <div className='input-field'>
                    <input
                      className={`${mobileSearch ? 'search-input-show' : ''}`}
                      type='text'
                      name='searched'
                      onChange={e => {
                        if (e.target.value === '' || e.target.value === null) {
                          setShowSearchResult(false)
                        } else {
                          setSearchedText(e.target.value)

                          performSerach(e.target.value)
                        }
                      }}
                      ref={searchedVal}
                      placeholder='Search'
                    />
                    <PiMagnifyingGlassLight
                      size={21}
                      className='search-icon'
                      onClick={() => {
                        setMobileSearch(!mobileSearch)
                      }}
                    />
                  </div>
                  <button type='submit' hidden className='search-btn'></button>
                </form>
              </li>
              <li className='me'>
                <NavLink
                  onClick={() => {
                    setProFileArrow(!profilearrow)
                    setMe(!me)
                  }}
                >
                  <img
                    src={user.profile.profile_pic}
                    width={25}
                    height={25}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                </NavLink>
                <ul
                  ref={meMobRef}
                  className={me ? `show-me-menu me-menu` : 'me-menu'}
                >
                  <li>
                    <Link
                      onClick={() => {
                        setMe(!me)
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => handleLogout()}>Log Out</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        }
      </div>
      <SearchResult
        open={showSearchResult}
        loading={loading}
        searchResult={searchResult}
        setShowSearchResult={setShowSearchResult}
      />
    </React.Fragment>
  )
}

export default NavBar
