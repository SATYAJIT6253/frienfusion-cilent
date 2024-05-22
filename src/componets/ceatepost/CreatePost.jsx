import React, { useState } from "react";
import "./createpost.scss";
import Avtar from "../avtar/Avtar";
import { BsCardImage } from "react-icons/bs";
// import postimg from "../../images/postimg.png";
import { useDispatch } from "react-redux";
import { axiosClient } from "../../pages/utils/axiosCilent";
import { setloading } from "../../Redux/slices/appConfigure";
function CreatePost() {
  const [postImg, setpostImg] = useState("https://th.bing.com/th/id/OIP.Dp8Ksv1GFNZFpcdi3jXY_AAAAA?w=474&h=355&rs=1&pid=ImgDetMain");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setpostImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  }
  async function postHandler() {
    try {
      dispatch(setloading(true));
      console.log("caption is",caption);
      console.log("postimage is",postImg);
      const result = await axiosClient.post('/posts', {
        caption,
        postImg
    });
      // console.log("post is", response);
    } catch (error) {
      console.log(error);
    } finally {
      setCaption("");
      setpostImg("");
    }
  }
  return (
    <div className="createpost">
      <div className="left-section">
        <Avtar />
      </div>
      <div className="right-section">
        <input
          type="text"
          name=""
          id=""
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />

        <div className="img-container">
          <img
            src={postImg}
            alt="upload image is here"
            style={{ width: "160px", height: "120px" }}
          />
        </div>

        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage
                style={{ width: "40px", height: "40px" }}
                onChange={handleImageChange}
              />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              // style={{ visibility: "hidden" }}
              onChange={handleImageChange}
            />
          </div>
          <button className="post-btn button-62" onClick={postHandler}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
