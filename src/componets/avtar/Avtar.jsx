import React from 'react'
import'./avtar.scss'
import userimg from '../../images/avtar.png'
function Avtar({src}) {
  return (
    <div className="avtar">
        <img src={src ? src : userimg } alt="" />
    </div>
  )
}

export default Avtar;