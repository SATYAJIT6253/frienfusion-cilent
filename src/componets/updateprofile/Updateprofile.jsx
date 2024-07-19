import React, { useEffect, useState } from "react";
import "./updateprofile.scss";
import { useDispatch, useSelector } from "react-redux";
import { showToast, updateprofile } from "../../Redux/slices/appConfigure";
import { axiosClient } from "../../pages/utils/axiosCilent";
import {
  KEY_ACESS_TOKEN,
  removeItem,
} from "../../pages/utils/localStoragemanager";
import { useNavigate } from "react-router-dom";
import { TOAST_FAILURE } from "../../App";
function Updateprofile() {
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [Userimg, setUserImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setUserImg(fileReader.result);
          console.log("img data", fileReader.result);
        }
      };
    }
  }
  function submithandeler(e) {
    e.preventDefault();
    dispatch(
      updateprofile({
        name,
        bio,
        Userimg,
      })
    );
  }
  async function deleteaccounthandeler() {
    try {
      await axiosClient.delete("/user/");
      removeItem(KEY_ACESS_TOKEN);
      navigate("/signup");
      dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: "account deleted sucessfully",
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setname(myprofile?.name);
    setbio(myprofile?.bio);
    setUserImg(myprofile?.avatar?.url);
  }, [myprofile]);
  return (
    <div className="w-3/4  mx-auto flex flex-col justify-center 
    items-center">
     
        <label htmlFor="inputImg" className="">
          <img src={Userimg} alt={name} className="w-36 h-36 rounded-full" />
        </label>
        <input
          id="inputImg"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      

      <div className="w-full flex flex-col items-center">
        <form action="" className="flex flex-col w-full  mx-auto gap-2 items-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            className="w-full h-10 bg-form-bg border-2 rounded-lg lg:w-3/5"
          />
          <textarea
            type="text"
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => {
              setbio(e.target.value);
              
            }}
            className="w-full h-20 bg-form-bg border-2 rounded-lg lg:w-3/5"
          />
          <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-2.5 text-center me-2 mb-2 w-40 " onClick={submithandeler}>
            Submit
          </button>
        </form>
        <button
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-52"
          onClick={deleteaccounthandeler}
        >
          Delete account
        </button>
      </div>
    </div>
  );
}

export default Updateprofile;
