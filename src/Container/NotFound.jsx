import React from 'react'
import useGlobal from '../Core/global'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import { FaArrowLeft, FaSignInAlt } from 'react-icons/fa'
const NotFound = () => {
  const navigate = useNavigate()
  const authenticated = useGlobal(state => state.authenticated)
  return (
    <div className='not-found'>
      <h1>
        404, <span> Page Not Found!</span>
      </h1>
      <p>Couldn't find the page you are looking for!</p>

      {authenticated ? (
        <Button
          text='Back to Home'
          icon={<FaArrowLeft />}
          action={() => navigate('/')}
        />
      ) : (
        <Button
          text='Login Now'
          icon={<FaSignInAlt />}
          action={() => navigate('/login')}
        />
      )}
    </div>
  )
}

export default NotFound
