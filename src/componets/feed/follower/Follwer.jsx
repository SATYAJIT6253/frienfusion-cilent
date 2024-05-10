import React from 'react'
import Avtar from '../../avtar/Avtar';
import './follower.scss';
function Follwer() {
  return (
    <div className='follower'>
        <Avtar/>
        <h4 className='name'>Random</h4>
        <button className='follow-btn'>Follow</button>
    </div>
  )
}

export default Follwer;