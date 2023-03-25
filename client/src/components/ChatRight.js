import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { chatSelector } from "../redux/chatSlice";
import { userSelector } from "../redux/userSlice";
import ChatBox from "./ChatRight/ChatBox";
import RightHeader from "./ChatRight/RightHeader";
import Modal from "./Modals/Modal";

const ChatRight = ({
  notifyError,
  notifySuccess,
  chatOptionModal,
  setChatOptionModal,
}) => {
  const { user } = useSelector(userSelector);
  const { selectedChat } = useSelector(chatSelector);

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
          <ChatBox notifyError={notifyError} notifySuccess={notifySuccess} />
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
