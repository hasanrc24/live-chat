import React, { useEffect, useState } from "react";
import { getSender } from "../../config/config";
import { SlOptions } from "react-icons/sl";
import UserModal from "../Modals/UserModal";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "../../redux/chatSlice";
import { onlineUserList, userSelector } from "../../redux/userSlice";
import io from "socket.io-client";

const RightHeader = ({
  openModal,
  setOpenModal,
  notifyError,
  notifySuccess,
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const { user, onlineUsers } = useSelector(userSelector);
  const { selectedChat } = useSelector(chatSelector);
  const dispatch = useDispatch();

  let socket = io.connect(process.env.REACT_APP_BASE_URL);

  useEffect(() => {
    socket.on("user_online", (users) => {
      dispatch(onlineUserList(users));
      const chatUser = getSender(user, selectedChat?.users)._id;
      if (users.includes(chatUser)) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    });
    return () => {
      socket.off("user_online");
    };
  }, [socket]);

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
        {isOnline ? (
          <span className="h-3 w-3 rounded-full bg-green-400 border-2 border-white -ml-[1.1rem] mt-[1.6rem]"></span>
        ) : (
          <span className="h-3 w-3 rounded-full bg-slate-500 border-2 border-white -ml-[1.1rem] mt-[1.6rem]"></span>
        )}
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
