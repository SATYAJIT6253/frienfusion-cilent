import React from "react";
import "./post.scss";
import Avtar from "../avtar/Avtar";
import postimg from '../../images/postimg.png';
import {BiLike} from 'react-icons/bi';
function Post() {
  return (
    <div className="post">
      <div className="container">
        <div className="header">
            <Avtar/>
            <h3>satyajit sahoo</h3>
        </div>
        <div className="content">
            <img  src={postimg} alt="" />
        </div>
        <div className="footer">
          <div className="like-section">
            <BiLike className="like-btn"/>
            <h4>4 likes</h4>
          </div>
          <p className="caption">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia labore nemo totam ab dolorum, voluptatum illum incidunt, porro similique, officia omnis perferendis!</p>
          <h4>4hr ago</h4>
        </div>
      </div>
    </div>
  );
}

export default Post;
