import React, { useState } from "react";
import "./feed.scss";
import { useEffect } from "react";
import Post from "../post/Post";
import Follwer from "./follower/Follwer";
import { axiosClient } from "../../pages/utils/axiosCilent";
function Feed() {
  const[result,setresult] = useState([]);
  async function fetchData()
  {
    const response = await axiosClient.get('/user/getmyinformation');
    // console.log(" response is ",response);
    setresult(response);
   
  }
  
useEffect(()=>{
  fetchData();
},[])
  
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
