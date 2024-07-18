import React from "react";
import { useEffect } from "react";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getfeedData } from "../../Redux/slices/feedConfigure";
import Follwer from "../follower/Follwer";
function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedConfigreducer.feedData);
  useEffect(() => {
    dispatch(getfeedData());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-5/6 mx-auto lg:w-3/4 lg:flex-row lg:justify-around">
      <div className="w-full lg:w-1/2">
        {feedData?.posts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
      <div className="lg:w-1/3">
        
          <div className="">
            <h2 className="text-xl font-medium py-4">You are folllowing</h2>
            {feedData?.followings?.map((user) => (
              <Follwer key={user._id} user={user} />
            ))}
          </div>
          <div className="text-xl font-medium py-4 mb-2">
            <h2 className="title">suggestion for you</h2>
            {feedData?.suggestions?.map((user) => (
              <Follwer key={user._id} user={user} />
            ))}
          </div>
        
      </div>
    </div>
  );
}

export default Feed;
