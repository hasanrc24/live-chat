import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector, dispatchNotification } from "../redux/chatSlice";
import { userSelector } from "../redux/userSlice";
import ChatBox from "./ChatRight/ChatBox";
import RightHeader from "./ChatRight/RightHeader";
import io from "socket.io-client";

const ChatRight = ({
  notifyError,
  notifySuccess,
  chatOptionModal,
  setChatOptionModal,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { selectedChat, notification } = useSelector(chatSelector);

  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // const ENDPOINT = "http://localhost:5000";
  // let socket = io.connect(ENDPOINT);
  // useEffect(() => {
  //   console.log("noti");
  //   socket.emit("setup", userInfo);
  //   socket.on("message_received", (newMsgR) => {
  //     if (
  //       Object.keys(selectedChat).length === 0 ||
  //       selectedChat._id !== newMsgR.chat._id
  //     ) {
  //       if (!notification.includes(newMsgR)) {
  //         dispatch(dispatchNotification(newMsgR));
  //       }
  //     }
  //   });
  // }, [socket]);
  return (
    <>
      {Object.keys(selectedChat).length !== 0 ? (
        <div className="flex flex-col h-[90vh] md:h-[80vh] pt-16 z-0">
          <RightHeader
            openModal={chatOptionModal}
            setOpenModal={setChatOptionModal}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          />
          <ChatBox
            notifyError={notifyError}
            notifySuccess={notifySuccess}
            // soclet={socket}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[90vh] md:h-[80vh]">
          <p className="text-xl font-semibold">
            Select a user to start chatting.
          </p>
        </div>
      )}
    </>
  );
};

export default ChatRight;
