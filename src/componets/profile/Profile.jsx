import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../ceatepost/CreatePost";
import { getuserinformation } from "../../Redux/slices/postConfigure";
import { followunfollowuser } from "../../Redux/slices/feedConfigure";
import avtar from '../../images/avtar.png'
function Profile() {
  const navigate = useNavigate();
  const [ismyProfile, setIsMyProfile] = useState(false);
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);

  // const avtar = myprofile?.avatar?.url;
  const dispatch = useDispatch();
  const params = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const feedData = useSelector((state) => state.feedConfigreducer.feedData);
  const userProfile = useSelector(
    (state) => state.postConfigreducer.userProfile
  );
  async function followunfollowhandeler() {
    dispatch(
      followunfollowuser({
        useridtofollow: params.userId,
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
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [myprofile, params.userId, feedData]);
  return (
    <div className="flex flex-col w-5/6 mx-auto lg:w-3/4 lg:flex-row lg:justify-around">
      <div className="w-full lg:w-1/2">
        {ismyProfile && 
        <CreatePost />}
        {userProfile?.posts?.length ? (
          userProfile?.posts.map((post) => <Post post={post} key={post._id} />)
        ) : (
          <div>no post is uploaded by this user</div>
        )}
      </div>
      
      
      <div className=" flex flex-col lg:w-2/5 bg-gray-400 rounded-2xl p-4 mb-20 mt-3 h-fit">
      <h1 className="mx-auto text-3xl font-bold p-5 ">User Information</h1>
        <div className="flex justify-around  mt-4 ">
          <div>
            <img
              className="h-24 w-24 object-fit border-2 rounded-full"
              src={userProfile?.avatar?.url || avtar}
              alt=""
            />
            <h2 className="px-3 text-2xl font-serif">{userProfile?.name}</h2>
          </div>
          <div className="w-1/2 flex justify-center">
            {!ismyProfile && (
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
               h-10 my-auto mr-2 text-base hover:cursor-pointer hover:bg-cyan-400 w-3/4" onClick={followunfollowhandeler}>
                {" "}
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
            {ismyProfile && (
              <button
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
               h-10 my-auto mr-2 text-base hover:cursor-pointer hover:bg-cyan-400 w-3/4"
                onClick={() => navigate("/updateprofile")}
              >
                update profile
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-evenly mt-4 text-lg">
          <h4 className=""><span className="text-xl font-black">{userProfile?.followers?.length}</span>{" "}followers</h4>
          <h4><span className="text-xl font-black">{userProfile?.followings?.length}</span>{" "} following</h4>
        </div>
      </div>
    </div>
  );
}

export default Profile;
