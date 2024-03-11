import React from 'react'
import { go, stewie, madmonkey } from '../assets/index'
import SubProfile from './SubProfile'
import { Link } from 'react-router-dom'
const Suggestion = () => {
  return (
    <div className='sugg'>
      <div className='sugg-people'>
        <p className='sugg-people-title'>People You may Know</p>
        <SubProfile
          profile_pic={madmonkey}
          Profile_name={'Mad Monkey'}
          profile_bio={'I scare chris'}
        />
        <SubProfile
          profile_pic={stewie}
          Profile_name={'Stewie Griffin'}
          profile_bio={'I walk than i talk'}
        />
        <SubProfile
          profile_pic={go}
          Profile_name={'Go Language'}
          profile_bio={'Go language every on e should learn me'}
        />
      </div>
      <Link>see more</Link>
    </div>
  )
}

export default Suggestion
