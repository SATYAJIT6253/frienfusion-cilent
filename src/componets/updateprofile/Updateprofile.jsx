import React, { useEffect, useState } from "react";
import "./updateprofile.scss";
import userimg from "../../images/avtar.png";
import { useDispatch, useSelector } from "react-redux";
import { showToast, updateprofile } from "../../Redux/slices/appConfigure";
import { axiosClient } from "../../pages/utils/axiosCilent";
import { KEY_ACESS_TOKEN, removeItem } from "../../pages/utils/localStoragemanager";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TOAST_FAILURE } from "../../App";
import { BsCardImage } from "react-icons/bs";
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
    if (file) 
    {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.readyState === fileReader.DONE) {
          setUserImg(fileReader.result);
          console.log("img data", fileReader.result);
        }
      };
    }
  }
  function submithandeler(e)
  {
      e.preventDefault();
      dispatch(updateprofile({
        name,bio,Userimg
      }))

  }
  async function deleteaccounthandeler() {
      try {
         
          await axiosClient.delete('/user/');
          removeItem(KEY_ACESS_TOKEN);
          navigate('/signup');
          dispatch(showToast({
            type:TOAST_FAILURE,
            message:"account deleted sucessfully"
          }))
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
    <div className="updateprofile">
      <div className="container">
        <div className="left-section">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={Userimg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{display:"none"}}
            />
           
          </div>
        </div>

        <div className="right-section">
          <form action="" className="update-form">
            <input
              type="text"
              placeholder="Enter your number"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => {
                setbio(e.target.value);
              }}
            />
            <button type="submit" className="submit-btn" onClick={submithandeler}>
              Submit
            </button>
          </form>
          <button className="submit-btn delet-btn" onClick={deleteaccounthandeler}>
            Delete account
            </button>
        </div>
      </div>
    </div>
  );
}

export default Updateprofile;
