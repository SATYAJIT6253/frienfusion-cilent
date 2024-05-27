import Login from "./pages/loginpage/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signuppage/Signup";
import Home from "./pages/homepage/home";
import RequireUser from "./componets/RequireUser";
import Feed from "./componets/feed/Feed";
import Profile from "./componets/profile/Profile";
import Updateprofile from "./componets/updateprofile/Updateprofile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar';
import RequireLogin from "./componets/RequireLogin";


function App() {

    const isloading = useSelector(state=>state.appconfigreducer.isloading);
    const loadingRef = useRef(null);
    useEffect(()=>{
      if (isloading) {
        loadingRef.current?.continuousStart();
      }else{
        loadingRef.current?.complete();
      }
    },[isloading])
  return (
      
    <div className="App">
      <LoadingBar color="#000" ref={loadingRef} />
      <Routes>
        <Route element={<RequireUser/>} >
          <Route element={<Home />}>
            <Route path="/" element={<Feed/>} />
            <Route path="/profile/:userId" element={<Profile/>}/>
            <Route path="/updateprofile" element={<Updateprofile/>}/>
          </Route>
        </Route>
        <Route >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
