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
import toast, { Toaster } from "react-hot-toast";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {

    const isloading = useSelector(state=>state.appconfigreducer.isloading);
    const loadingRef = useRef(null);
    const toastdata = useSelector(state=> state.appconfigreducer.toastdata);
    useEffect(()=>{
      if (isloading) {
        loadingRef.current?.continuousStart();
      }else{
        loadingRef.current?.complete();
      }
    },[isloading])
    useEffect(()=>{
      switch (toastdata.type) 
      {
        case TOAST_SUCCESS:
            toast.success(toastdata.message);
            break;
        case TOAST_FAILURE:
            toast.error(toastdata.message);
            break;
       
      }
      // if(toastdata.type == TOAST_SUCCESS)
      //   {
      //     toast.success(toastdata.message);
      //   }else if(toastdata.type == TOAST_FAILURE)
      //   {
      //       toast.error(toastdata.message);
      //   }
    },[toastdata])
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
