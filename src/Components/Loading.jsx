import React from 'react'
import useGlobal from '../Core/global'
import { spinner } from '../assets'
const Loading = () => {
  const loading = useGlobal(state => state.loading)

  return (
    <div className={`modal ${loading ? 'modal-open' : ''}`}>
      <div className='load-modal'>
        <img src={spinner} alt='' />
      </div>
    </div>
  )
}

export default Loading
