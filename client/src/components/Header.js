import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoNotificationsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserInfo, userSelector } from "../redux/userSlice";
import Modal from "./Modals/Modal";
import { HiArrowSmLeft } from "react-icons/hi";
import { toggleLeft, toggleRight, toggleSelector } from "../redux/toggleSlice";
import {
  chatSelector,
  dispatchNotification,
  dispatchSelectedChat,
  removeNotification,
} from "../redux/chatSlice";
import io from "socket.io-client";

const Header = ({ openModal, setOpenModal }) => {
  let socket = io.connect("http://localhost:5000");
  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShoeNotif] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(userSelector);
  const { toggle } = useSelector(toggleSelector);
  const { notification, selectedChat } = useSelector(chatSelector);

  const handleLogout = () => {
    dispatch(addUserInfo({}));
    dispatch(dispatchSelectedChat({}));
    dispatch(toggleLeft());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleNotification = (chat) => {
    setShoeNotif(false);
    dispatch(toggleRight());
    dispatch(dispatchSelectedChat(chat));
    dispatch(removeNotification(chat));
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const hasDispatchedNotificationRef = useRef(false);

  useEffect(() => {
    socket.emit("setup", userInfo);
    socket.on("message_received", (newMsgR) => {
      const notificationExists = notification.every(
        (notificationMsg) => notificationMsg.chat._id !== newMsgR.chat._id
      );
      if (
        Object.keys(selectedChat).length === 0 ||
        selectedChat._id !== newMsgR.chat._id
      ) {
        if (notificationExists) {
          dispatch(dispatchNotification(newMsgR));
          hasDispatchedNotificationRef.current = true;
        }
      }
    });
    return () => {
      socket.off("message_received");
      hasDispatchedNotificationRef.current = false;
    };
  }, [dispatch, notification, selectedChat]);

  return (
    <div className="bg-brand text-white p-4 flex justify-between items-center z-50">
      <div
        onClick={() =>
          dispatch(toggleLeft(), dispatch(dispatchSelectedChat({})))
        }
        className="block md:hidden w-1/3 md:w-full cursor-pointer relative"
      >
        {!toggle && <HiArrowSmLeft className="h-7 w-7" />}
      </div>
      <p className="font-semibold text-lg text-center md:text-left w-1/3 md:w-full">
        Live Chat
      </p>
      <div className="font-semibold flex gap-3 w-1/3 md:w-full justify-end relative">
        <div className="flex items-center cursor-pointer relative">
          <IoNotificationsSharp
            onClick={() => setShoeNotif(!showNotif)}
            className="h-5 w-5"
          />
          {notification.length !== 0 && (
            <span className="h-4 w-4 rounded-full bg-red-600 -ml-2 -mb-2 text-white text-[.7rem] text-center">
              {notification.length}
            </span>
          )}
          {showNotif && (
            <div className="absolute z-50 top-full right-full rounded-md shadow-md bg-white text-black px-3 py-2 w-max">
              {Object.keys(notification).length === 0 ? (
                <p>Nothing here</p>
              ) : (
                notification?.map((noti) => {
                  return (
                    <div
                      key={noti._id}
                      className="text-sm font-normal border-y"
                      onClick={() => handleNotification(noti?.chat)}
                    >
                      {noti?.chat?.isGroupChat === true
                        ? `You got a message in ${noti?.chat?.chatName}`
                        : `Message from ${noti?.sender?.name}`}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="cursor-pointer flex items-center transition-all"
        >
          <img
            src={user.picture}
            alt="profile img"
            className="h-8 w-8 rounded-full"
          />
          <div className="relative">
            <BiChevronDown
              className={`h-7 w-7 transition-all ${
                showMenu ? "rotate-180" : ""
              }`}
            />
            {showMenu && (
              <div className="absolute flex flex-col gap-2 right-0 top-11 py-2 px-3 text-white bg-brand z-50">
                <p onClick={() => setOpenModal(true)}>Profile</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
            {}
          </div>
        </div>
        {openModal && (
          <Modal
            user={user}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
