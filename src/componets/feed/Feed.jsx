import React, { useState } from "react";
import "./feed.scss";
import { useEffect } from "react";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getfeedData } from "../../Redux/slices/feedConfigure";
import Follwer from "../follower/Follwer";
function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state)=> state.feedConfigreducer.feedData);
useEffect(()=>{
  dispatch(getfeedData())
  
},[dispatch])
  
  return (
    <div className="feed">
      <div className="container">
        <div className="left-part">
          {
            feedData?.posts?.map(post => <Post post={post} key={post._id}/>)
          }
         

        </div>
        <div className="right-part">
          <div className="following">
            <h2 className="title">You are folllowing</h2>
            {feedData?.followings?.map(user => <Follwer  key={user._id} user={user} />)}
           
          </div>
          <div className="suggestion">
            <h2 className="title">suggestion for you</h2>
            {feedData?.suggestions?.map(user => <Follwer key={user._id} user={user}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
