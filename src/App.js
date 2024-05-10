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
      <LoadingBar color='#00FF00' ref={loadingRef} loaderSpeed={0.5} height={2}/>
      <Routes>
        <Route>
          <Route element={<Home />}>
            <Route path="/" element={<Feed/>} />
            <Route path="/profile/:userid" element={<Profile/>}/>
            <Route path="/updateprofile" element={<Updateprofile/>}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
