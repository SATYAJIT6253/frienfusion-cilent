import React from 'react'
import'./avtar.scss'
import userimg from '../../images/avtar.png'
function Avtar({src}) {
  return (
    <div className="w-16 h-16">
        <img src={src ? src : userimg } alt="" className='rounded-full' />
    </div>
  )
}

export default Avtar;