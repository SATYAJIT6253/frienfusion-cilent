import Avtar from "../avtar/Avtar";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloading, showToast } from "../../Redux/slices/appConfigure";
import { axiosClient } from "../../pages/utils/axiosCilent";
import {
  KEY_ACESS_TOKEN,
  removeItem,
} from "../../pages/utils/localStoragemanager";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myprofile = useSelector((state) => state.appconfigreducer.myProfile);
  // console.log("myprofile is ",myprofile);
  async function logouthandeler() {
    try {
      dispatch(setloading(true));
      const response = await axiosClient.post("/auth/logout");
      removeItem(KEY_ACESS_TOKEN);

      dispatch(setloading(false));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-3/4 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 h-30">
      <div className="w-full flex flex-row justify-between items-center hover:cursor-pointer">
        <div className="mx-4 text-2xl font-mono">
          <h2
            className="font-bold font-mono lg:px-4"
            onClick={() => navigate("/")}
          >
            FriendFusion
          </h2>
        </div>
        <div
          className="flex m-2 justify-center items-center lg:px-6"
          onClick={() => navigate(`/profile/${myprofile?._id}`)}
        >
          <Avtar src={myprofile?.avatar?.url} />

          <div className="w-10" onClick={logouthandeler}>
            <FiLogOut className="w-10 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
