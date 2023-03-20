import React, { useEffect, useState } from "react";
import ChatLeft from "../components/ChatLeft";
import ChatRight from "../components/ChatRight";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const info = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(addUserInfo(info));
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div
      // onClick={() => setShowMenu(false)}
      className="bg-brand-bg h-screen flex justify-center items-center"
    >
      <div className="h-[80%] w-[70%] bg-white rounded-xl shadow-xl overflow-hidden">
        <Header setShowMenu={setShowMenu} showMenu={showMenu} />
        <div className="grid md:grid-cols-3 sm:grid-col-1 h-full">
          <div className="border-r-2 h-0 md:h-full">
            <ChatLeft />
          </div>
          <div className="md:col-span-2">
            <ChatRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
