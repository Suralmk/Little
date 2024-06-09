import React from 'react'

const Button = ({ text, bg, icon, action, color }) => {
  return (
    <button
      style={{
        color: color,
        backgroundColor: bg,
        alignItems: 'center',
        gap: 15,
        display: 'flex'
      }}
      onClick={event => action(event)}
    >
      {' '}
      {icon} {text}
    </button>
  )
}

export default Button
