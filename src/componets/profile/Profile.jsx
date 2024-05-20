import React from "react";
import userimg from "../../images/avtar.png";
import Post from "../post/Post";
import './profile.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
function Profile() {
  const navigate = useNavigate();
  
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  const avtar = myprofile?.avatar?.url;
  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          <Post/>
          <Post/>
          <Post/>

        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={avtar || userimg} alt="" />
            <h2 className="user-name">satyajit sahoo</h2>

            <div className="follower-info">
              <h4>40 followers</h4>
              <h4>12 Followings</h4>
            </div>
            <button className="follow-btn">follow</button>
            <button className="update-btn" onClick={()=> navigate('/updateprofile')}>update profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
