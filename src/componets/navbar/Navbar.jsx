import React, { useRef, useState } from "react";
import "./navbar.scss";
import Avtar from "../avtar/Avtar";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setloading } from "../../Redux/slices/appConfigure";


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function changeloadingbar() {
    dispatch(setloading(true));
  }
  return (
    <div className="navbar">
       
      <div className="container">
        <div className="leftside">
          <h2 className="banner" onClick={() => navigate("/")}>
            Socialmedia
          </h2>
        </div>
        <div className="rightside">
          <div onClick={() => navigate("/profile/:gfdff")}>
            <Avtar />
          </div>

          <div className="logout-cont" onClick={changeloadingbar} >
            <FiLogOut className="logout-btn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
