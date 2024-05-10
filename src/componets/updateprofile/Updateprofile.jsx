import React from 'react'
import './updateprofile.scss';
import userimg from "../../images/avtar.png";
function Updateprofile() {
  return (
    <div className='updateprofile'>
        <div className="container">
          <div className="left-section">
              <img src={userimg} alt="" />
          </div>
          <div className="right-section">
                <form action="" className='update-form'>
                  <input type="text" name="" placeholder='Enter your number' />
                  <input type="text" name="" placeholder='Enter your bio' />
                  <button type="submit" className='submit-btn'>Submit</button>
                </form>
                <button className='submit-btn delet-btn'>Delete account</button>
          </div>
        </div>
    </div>
  )
}

export default Updateprofile;