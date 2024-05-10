import Login from "./pages/loginpage/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signuppage/Signup";
import Home from "./pages/homepage/home";
import RequireUser from "./componets/RequireUser";
import Feed from "./componets/feed/Feed";
import Profile from "./componets/profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed/>} />
            <Route path="/profile/:userid" element={<Profile/>}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
