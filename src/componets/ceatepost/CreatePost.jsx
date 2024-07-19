import React, { useEffect, useState } from "react";
import "./createpost.scss";
import Avtar from "../avtar/Avtar";
import { BsCardImage } from "react-icons/bs";
// import postimg from "../../images/postimg.png";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../pages/utils/axiosCilent";
import { setloading, showToast } from "../../Redux/slices/appConfigure";
import { getuserinformation } from "../../Redux/slices/postConfigure";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
function CreatePost() {
  const [postImg, setpostImg] = useState("");
  const [caption, setCaption] = useState("");
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  const dispatch = useDispatch();
  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setpostImg(fileReader.result);
        // console.log("img data", fileReader.result);
      }
    };
  }
  async function postHandler() {
    try {
      dispatch(setloading(true));
      const result = await axiosClient.post("/posts", {
        caption,
        postImg,
      });
      // console.log("post is",result);
      dispatch(getuserinformation({ userId: myprofile?._id }));
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "post created sucessfully",
        })
      );
      dispatch(setloading(false));
    } catch (error) {
      dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: error,
        })
      );
      console.log(error);
    } finally {
      setCaption("");
      setpostImg("");
    }
  }

  return (
    <div className="flex flex-col border-2 border-orange-700 items-center mb-4 rounded-xl">
      <h1 className="text-3xl font-bold text-opacity-20 my-2">Share your Memories</h1>
      <textarea
        name=""
        type="text"
        value={caption}
        onChange={(e) => {
          setCaption(e.target.value);
        }}
        placeholder="give a beutiful caption for your post"
        className="w-11/12 h-36 bg-form-bg text-base mx-auto"
      />

      <div className="w-11/12 mx-4 mt-2 h-fit">
        <img src={postImg} alt="upload image is here" className="w-full" />
        <label htmlFor="inputImg" className="labelImg">
          <BsCardImage
            className="w-8 h-8"
            onChange={handleImageChange}
          />
        </label>
        <input
          className="inputImg"
          id="inputImg"
          type="file"
          accept="image/*"
          style={{ visibility: "hidden" }}
          onChange={handleImageChange}
        />
      </div>
      <button className="border-2 mt-1 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-1/2 " onClick={postHandler}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;
