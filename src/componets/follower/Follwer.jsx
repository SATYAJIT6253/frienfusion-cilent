import React, { useEffect, useState } from "react";
import "./follower.scss";
import { useDispatch, useSelector } from "react-redux";
import { followunfollowuser } from "../../Redux/slices/feedConfigure";
import { useNavigate } from "react-router-dom";

import Avtar from "../avtar/Avtar";
function Follwer({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state.feedConfigreducer.feedData);
  const [isFollwing, setisFollowing] = useState();
  async function followunfollowhandeler() {
    dispatch(
      followunfollowuser({
        useridtofollow: user._id,
      })
    );
    
  }
  useEffect(() => {
    if (feedData.followings.find((item) => item._id === user._id)) {
      setisFollowing(true);
    } else {
      setisFollowing(false);
    }
  }, [feedData]);
  return (
    <div className="follower">
      <div onClick={() => {navigate(`/profile/${user?._id}`)}} >
        <Avtar src={user?.avatar?.url}/>
        <h4 className="name">{user?.name}</h4>
      </div>
      
      <button className="follow-btn" onClick={followunfollowhandeler}>
        {isFollwing ? "unfollow" : "follow"}
      </button>
    
    </div>
  );
}

export default Follwer;
