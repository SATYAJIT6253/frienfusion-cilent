import React from 'react'
import userimg from '../../images/avtar.png'
function Avtar({src}) {
  return (
    <div className="w-16 h-16">
        <img src={src ? src : userimg } alt="" className='rounded-full w-full h-full hover:cursor-pointer' />
    </div>
  )
}

export default Avtar;