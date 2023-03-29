import React, { useEffect, useState } from "react";
import ChatLeft from "../components/ChatLeft";
import ChatRight from "../components/ChatRight";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, onlineUserList, userSelector } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toggleSelector } from "../redux/toggleSlice";
import { toast, Toaster } from "react-hot-toast";
import io from "socket.io-client";
import { chatSelector } from "../redux/chatSlice";
import { getSender } from "../config/config";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const [openModal, setOpenModal] = useState(false);
  const [chatOptionModal, setChatOptionModal] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const { toggle } = useSelector(toggleSelector);
  const { user, onlineUsers } = useSelector(userSelector);
  const { selectedChat } = useSelector(chatSelector);

  useEffect(() => {
    if (localStorage.getItem("userInfo") || Object.keys(user).length > 0) {
      const info = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(addUserInfo(info));
    } else {
      navigate("/login");
    }
  }, []);

  const localUser = JSON.parse(localStorage.getItem("userInfo"));

  if (Object.keys(selectedChat) > 0) {
    const chatUser = getSender(user, selectedChat?.users);
    console.log(chatUser);
  }

  let socket = io.connect(process.env.REACT_APP_BASE_URL);

  useEffect(() => {
    socket.emit("user_connect", localUser._id);
    socket.off("user_online").on("user_online", (users) => {
      dispatch(onlineUserList(users));
      if (Object.keys(selectedChat).length > 0) {
        const chatUser = getSender(user, selectedChat?.users);
        if (
          selectedChat.users.includes(chatUser) &&
          onlineUsers.includes(chatUser._id)
        ) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      }
    });
    return () => {
      socket.emit("user_disconnect", user._id);
    };
  }, [selectedChat]);

  return (
    <div className="bg-brand-bg h-screen flex justify-center items-center">
      <div className="h-[90vh] w-[90vw] md:h-[80vh] md:w-[70vw] bg-white rounded-xl shadow-xl overflow-hidden">
        <Header openModal={openModal} setOpenModal={setOpenModal} />
        <div className="grid md:grid-cols-3 sm:grid-col-2 h-full -mt-16 pt-16 z-20">
          <div
            className={`${
              toggle ? "block" : "hidden"
            } md:block border-r-2 h-0 md:h-full`}
          >
            <ChatLeft notifyError={notifyError} notifySuccess={notifySuccess} />
          </div>
          <div
            className={`${
              toggle ? "hidden" : "block"
            } md:block md:col-span-2 -mt-16`}
          >
            <ChatRight
              notifyError={notifyError}
              notifySuccess={notifySuccess}
              chatOptionModal={chatOptionModal}
              setChatOptionModal={setChatOptionModal}
              isOnline={isOnline}
            />
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
