import React, { useEffect } from "react";
import Avtar from "../avtar/Avtar";
import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { likeandunlikepost } from "../../Redux/slices/postConfigure";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../Redux/slices/appConfigure";
import { TOAST_SUCCESS } from "../../App";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ismyProfile, setIsMyProfile] = useState();
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  const params = useParams();
  console.log(post);
  async function postlikehandeker() {
    dispatch(
      likeandunlikepost({
        postId: post._id,
      })
    );
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "post liked or unliked",
      })
    );
  }
  useEffect(() => {
    setIsMyProfile(params?.userId === myprofile?._id);
  }, [params.userId, myprofile]);
  return (
    <div className="flex flex-col w-full pt-3 mb-3 border-2 border-gray-600 rounded-xl">
      <div
        className="flex justify-around"
        onClick={() => {
          navigate(`/profile/${post?.owner?._id}`);
        }}
      >
        <Avtar src={post?.owner?.avatar?.url} />
        <h3 className="p-4 text-xl text-semibold">{post?.owner?.name}</h3>
      </div>
      <div className="flex justify-center w-5/6 mx-auto mt-2">
        <img
          src={post?.image?.url}
          alt=""
          className="w-full h-80 rounded-xl border-8 border-gray-200"
        />
      </div>
      <p className="w-3/4 mx-auto">{post?.caption}</p>
      
        <div className="w-3/4 mx-auto flex justify-between" onClick={postlikehandeker}>
          <div>
            {post.isliked ? (
              <BiSolidLike className="w-10 h-10" />
            ) : (
              <BiLike className="w-10 h-10" />
            )}
          </div>
          <Toaster />
          <h4 className="text-lg mt-2">{post?.likescnt}{" "}likes</h4>
        </div>

        <h4 className="w-3/4 mx-auto text-lg">{post?.timeago}</h4>
      
    </div>
  );
}

export default Post;
