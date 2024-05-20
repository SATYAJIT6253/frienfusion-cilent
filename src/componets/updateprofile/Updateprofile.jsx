import React, { useEffect, useState } from "react";
import "./updateprofile.scss";
import userimg from "../../images/avtar.png";
import { useDispatch, useSelector } from "react-redux";
import { updateprofile } from "../../Redux/slices/appConfigure";
function Updateprofile() {
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [UserImg, setUserImg] = useState("");
  const dispatch = useDispatch();
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
      
      dispatch(updateprofile({
        name,bio,UserImg
      }))

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
              <img src={UserImg ? UserImg : userimg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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
          <button className="submit-btn delet-btn">Delete account</button>
        </div>
      </div>
    </div>
  );
}

export default Updateprofile;
