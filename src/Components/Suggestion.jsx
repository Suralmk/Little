import React, { useEffect, useState } from 'react'
import { go, stewie, madmonkey } from '../assets/index'
import SubProfile from './SubProfile'
import { Link } from 'react-router-dom'
import { api } from '../Core/config'
const Suggestion = ({ forceUpdateProfile }) => {
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [suggestions, setSuggestions] = useState([])
  const getSuggestion = async () => {
    try {
      const res = await api.get('/users/suggestion/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access}`
        }
      })
      setSuggestions(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getSuggestion()
  }, [])
  return (
    <div className='sugg'>
      <div className='sugg-people'>
        <p className='sugg-people-title'>People You may Know</p>
        {suggestions.map((suggestion, id) => (
          <SubProfile
            key={id}
            suggestion={suggestion}
            forceUpdateProfile={forceUpdateProfile}
          />
        ))}
      </div>
    </div>
  )
}

export default Suggestion
