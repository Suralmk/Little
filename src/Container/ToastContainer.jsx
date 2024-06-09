import React from 'react'
import useGlobal from '../Core/global'
import Toast from '../Components/Toast'

const ToastContainer = () => {
  const toasts = useGlobal(state => state.toasts)

  return (
    <div>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  )
}

export default ToastContainer
