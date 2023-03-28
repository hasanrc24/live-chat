import React, { useEffect, useState } from "react";
import { getSender } from "../../config/config";
import { SlOptions } from "react-icons/sl";
import UserModal from "../Modals/UserModal";
import { useSelector } from "react-redux";
import { chatSelector } from "../../redux/chatSlice";
import { userSelector } from "../../redux/userSlice";
import io from "socket.io-client";

const RightHeader = ({
  openModal,
  setOpenModal,
  notifyError,
  notifySuccess,
}) => {
  const { user } = useSelector(userSelector);
  const { selectedChat } = useSelector(chatSelector);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("userInfo"));

  const ENDPOINT = "http://localhost:5000";
  let socket = io.connect(ENDPOINT);

  useEffect(() => {
    socket.emit("user_connect", localUser._id);
    socket.off("user_online").on("user_online", (users) => {
      setOnlineUsers(users);
      const chatUser = getSender(user, selectedChat?.users);
      if (onlineUsers.includes(chatUser._id)) {
        setIsOnline(true);
      }
    });
    return () => {
      socket.emit("user_disconnect", user._id);
    };
  }, [selectedChat]);

  console.log(onlineUsers);

  return (
    <div className="flex justify-between items-center px-3 py-2 bg-white relative z-20">
      <div className="flex gap-2">
        <img
          src={
            !selectedChat?.isGroupChat
              ? getSender(user, selectedChat?.users).picture
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="img"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-semibold">
            {selectedChat?.isGroupChat
              ? selectedChat?.chatName
              : getSender(user, selectedChat?.users).name}
          </p>
          <span className="text-xs -mt-1 absolute">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div onClick={() => setOpenModal(true)} className="pr-3 cursor-pointer">
        <SlOptions className="h-5 w-5" />
      </div>
      {openModal && (
        <UserModal
          setOpenModal={setOpenModal}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
        />
      )}
    </div>
  );
};

export default RightHeader;
