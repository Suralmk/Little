import React from 'react'
import { useLocation } from 'react-router-dom'

const SearchResult = () => {
  const location = useLocation()
  return (
    <div>
      {location.state.map((result, key) => (
        <div key={key} className='search-resulr-container'>
          <p>{result.email}</p>
        </div>
      ))}
    </div>
  )
}

export default SearchResult
