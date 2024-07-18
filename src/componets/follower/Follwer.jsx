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
    <div className="w-full bg-zinc-300 rounded-xl flex mt-2 gap-16 h-fit p-3">
      <div
        onClick={() => {
          navigate(`/profile/${user?._id}`);
        }}
        className="flex w-2/3 gap-4 items-center"
      >
        <Avtar src={user?.avatar?.url} />
        <h4 className="text-xl  font-mono">{user?.name}</h4>
      </div>
      <button
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-1/3 h-10 my-auto mr-2 text-base hover:cursor-pointer hover:bg-cyan-400"
        onClick={followunfollowhandeler}
      >
        {isFollwing ? "unfollow" : "follow"}
      </button>
    </div>
  );
}

export default Follwer;
