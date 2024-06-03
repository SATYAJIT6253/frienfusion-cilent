import React, { useEffect } from "react";
import "./post.scss";
import Avtar from "../avtar/Avtar";
import postimg from '../../images/postimg.png';
import { useState } from "react";
import {BiLike} from 'react-icons/bi';
import { BiSolidLike } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deletepost, likeandunlikepost } from "../../Redux/slices/postConfigure";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../Redux/slices/appConfigure";
import { TOAST_SUCCESS } from "../../App";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast'
import { axiosClient } from "../../pages/utils/axiosCilent";

function Post({post}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ismyProfile, setIsMyProfile] = useState();
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile); 
  const params = useParams();
  console.log(post);
  async function postlikehandeker() 
  {
     
      dispatch(likeandunlikepost({
        postId : post._id
      }))
      dispatch(showToast({
        type : TOAST_SUCCESS,
        message : "post liked or unliked"
      }))
      
  }
  useEffect(()=>{
    setIsMyProfile(params?.userId === myprofile?._id)
    
  },[params.userId,myprofile])
  return (
    <div className="post">
      <div className="container">
        <div className="header" onClick={() => {navigate(`/profile/${post?.owner?._id}`)}}>
            <Avtar src={post?.owner?.avatar?.url}/>
            <h3>{post?.owner?.name}</h3>
        </div>
        <div className="content">
            <img  src={post?.image?.url} alt="" />
        </div>
        <div className="footer">
          <div className="like-section" onClick={postlikehandeker}>
            {
              post.isliked ? (<BiSolidLike className="like-btn" />) : (<BiLike className="like-btn" />)
            }
            <Toaster/>
            <h4 >{post?.likescnt}likes</h4>
          </div>
          <p className="caption">{post?.caption}</p>
          <h4>{post?.timeago}</h4>
         
         
        </div>
      </div>
    </div>
  );
}

export default Post;
