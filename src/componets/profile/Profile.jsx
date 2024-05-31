import React, { useEffect, useState } from "react";
import userimg from "../../images/avtar.png";
import Post from "../post/Post";
import "./profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../ceatepost/CreatePost";
import { getuserinformation } from "../../Redux/slices/postConfigure";
import { axiosClient } from "../../pages/utils/axiosCilent";
import { followunfollowuser } from "../../Redux/slices/feedConfigure";
function Profile() {
  const navigate = useNavigate();
  const [ismyProfile, setIsMyProfile] = useState(false);
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  
  // const avtar = myprofile?.avatar?.url;
  const dispatch = useDispatch();
  const params = useParams();
  const [isFollowing,setIsFollowing] = useState(false);
  
  const feedData = useSelector((state)=> state.feedConfigreducer.feedData);
  const userProfile = useSelector((state) => state.postConfigreducer.userProfile);
  async function followunfollowhandeler() {
    dispatch(
      followunfollowuser({
        useridtofollow: params.userId
      })
    );
    
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        // setpostImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  }
  useEffect(() => {
    
    dispatch(getuserinformation({ userId: params?.userId }));
    // console.log(userProfile?.posts);
    setIsMyProfile(myprofile?._id === params.userId);
    setIsFollowing(feedData?.followings?.find((item) => item._id === params.userId));
   
    
  }, [myprofile,params.userId,feedData]);
  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {ismyProfile && <CreatePost/>}
          {
            userProfile?.posts?.length ? 
            (
              userProfile?.posts.map(post => <Post post= {post} key={post._id}/>)
            )
            :
            (
              <div>no post is uploaded by this user</div>
            )
            
          }
          
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={userProfile?.avatar?.url} alt="" />
            <h2 className="user-name">{userProfile?.name}</h2>

            <div className="follower-info">
              <h4>{userProfile?.followers?.length} followers</h4>
              <h4>{userProfile?.followings?.length} following</h4>
            </div>
            {!ismyProfile && <button className="follow-btn" onClick={followunfollowhandeler}> {isFollowing ? "Unfollow" : "Follow"}</button>}
            {ismyProfile && (
              <button
                className="update-btn"
                onClick={() => navigate("/updateprofile")}
              >
                update profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
