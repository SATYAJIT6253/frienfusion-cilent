import React, { useEffect, useState } from "react";
import "./updateprofile.scss";
import userimg from "../../images/avtar.png";
import { useSelector } from "react-redux";
function Updateprofile() {
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [Userimg, setUserimg] = useState("");
  // function handleImageChange(e) 
  // {
  //   const file = e.target.files[0];
  //       const fileReader = new FileReader();
  //       fileReader.readAsDataURL(file);
  //       fileReader.onload = () => {
  //           if(fileReader.readyState === fileReader.DONE) {
  //               setUserimg(fileReader.result)
  //               console.log('img data', fileReader.result);
  //           }
  //       }
  // }
  useEffect(() => {
    setname(myprofile?.name);
    setbio(myprofile?.bio);
    setUserimg(myprofile?.userimg);
  }, [myprofile]);
  return (
    <div className="updateprofile">
      <div className="container">
        <div className="input-user-img">
          <label htmlFor="inputImg" className="labelImg">
            <img src={Userimg ? Userimg : userimg} alt={name} />
          </label>
          <input
            className="inputImg"
            id="inputImg"
            type="file"
            accept="image/*"
            
          />
        </div>
        <div className="right-section">
          <form action="" className="update-form">
            <input
              type="text"
              name=""
              placeholder="Enter your number"
              value={name}
              onChange={(e)=>{setname(e.target.value)}}
            />
            <input
              type="text"
              name=""
              placeholder="Enter your bio"
              value={bio}
              onChange={(e)=>{setbio(e.target.value)}}
            />
            <button type="submit" className="submit-btn">
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
