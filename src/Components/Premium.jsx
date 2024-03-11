import React from 'react'
import { PiCrownSimple } from 'react-icons/pi'

const Premium = () => {
  return (
    <div className='premium-container'>
      <h2>
        try little Premium{' '}
        <span>
          {' '}
          <PiCrownSimple size={40} />
        </span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rem
        voluptatum sunt sit at est, nisi temporibus eum sequi amet doloribus
        officia.
      </p>
      <button>Try Now 20X Fast</button>
    </div>
  )
}

export default Premium
