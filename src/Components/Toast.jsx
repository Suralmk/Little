import React, { useEffect } from 'react'
import useGlobal from '../Core/global'
const Toast = ({ id, message, type }) => {
  const removeToast = useGlobal(state => state.removeToast)

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 6000)

    return () => clearTimeout(timer)
  }, [id, removeToast])

  return (
    <div
      className={` toast ${
        type === 'success' ? 'success-toast' : 'failure-toast'
      }`}
    >
      {message}
    </div>
  )
}

export default Toast
