import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const SearchResult = () => {
  const location = useLocation()
  const searched = useParams()

  console.log(searched)

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
