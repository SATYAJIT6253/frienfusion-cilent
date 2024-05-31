import React, { useRef, useState } from "react";
import "./navbar.scss";
import Avtar from "../avtar/Avtar";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloading, showToast } from "../../Redux/slices/appConfigure";
import { axiosClient } from "../../pages/utils/axiosCilent";
import { KEY_ACESS_TOKEN, removeItem } from "../../pages/utils/localStoragemanager";


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myprofile = useSelector(state=>state.appconfigreducer.myProfile);
  // console.log("myprofile is ",myprofile);
  async function logouthandeler() {
    try {
       dispatch(setloading(true))
       const response = await axiosClient.post('/auth/logout');
       removeItem(KEY_ACESS_TOKEN);
       
       dispatch(setloading(false));
       navigate("/login");
       
      
    } catch (error) {
      console.log(error);
    }

  }
  
  return (
    <div className="navbar">
       
      <div className="container">
        <div className="leftside">
          <h2 className="banner" onClick={() => navigate("/")}>
            Socialmedia
          </h2>
        </div>
        <div className="rightside" onClick={()=>navigate(`/profile/${myprofile?._id}`)}>
          <div >
            <Avtar src={myprofile?.avatar?.url} />
          </div>

          <div className="logout-cont" onClick={logouthandeler}>
            <FiLogOut className="logout-btn" />
            
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Navbar;
