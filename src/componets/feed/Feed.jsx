import React from "react";
import "./feed.scss";

import Post from "../post/Post";
import Follwer from "./follower/Follwer";
function Feed() {
  return (
    <div className="feed">
      <div className="container">
        <div className="left-part">
          <Post />
          <Post/>
          <Post />
          <Post/>

        </div>
        <div className="right-part">
          <div className="following">
            <h2 className="title">You are folllowing</h2>
            <Follwer/>
            <Follwer/>
            <Follwer/>
            <Follwer/>
            <Follwer/>
            <Follwer/>
          </div>
          <div className="suggestion">
            <h2 className="title">suggestion for you</h2>
            <Follwer/>
            <Follwer/>
            <Follwer/>
            <Follwer/>
            <Follwer/>
            <Follwer/>
            <Follwer/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
