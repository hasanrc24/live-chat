import React, { useEffect, useState } from "react";
import ChatLeft from "../components/ChatLeft";
import ChatRight from "../components/ChatRight";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toggleSelector } from "../redux/toggleSlice";
import { toast, Toaster } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const [openModal, setOpenModal] = useState(false);
  const [chatOptionModal, setChatOptionModal] = useState(false);

  const { toggle } = useSelector(toggleSelector);

  useEffect(() => {
    console.log("Render");
    if (localStorage.getItem("userInfo")) {
      const info = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(addUserInfo(info));
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="bg-brand-bg h-screen flex justify-center items-center">
      <div className="h-[90vh] w-[90vw] md:h-[80vh] md:w-[70vw] bg-white rounded-xl shadow-xl overflow-hidden">
        <Header openModal={openModal} setOpenModal={setOpenModal} />
        <div className="grid md:grid-cols-3 sm:grid-col-2 h-full -mt-16 pt-16">
          <div
            className={`${
              toggle ? "block" : "hidden"
            } md:block border-r-2 h-0 md:h-full`}
          >
            <ChatLeft notifyError={notifyError} notifySuccess={notifySuccess} />
          </div>
          <div
            className={`${toggle ? "hidden" : "block"} md:block md:col-span-2`}
          >
            <ChatRight
              notifyError={notifyError}
              notifySuccess={notifySuccess}
              chatOptionModal={chatOptionModal}
              setChatOptionModal={setChatOptionModal}
            />
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
