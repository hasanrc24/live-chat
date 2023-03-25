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
        <div className="flex flex-col h-[60vh]">
          <RightHeader
            openModal={chatOptionModal}
            setOpenModal={setChatOptionModal}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          />
          <ChatBox notifyError={notifyError} notifySuccess={notifySuccess} />
          <form className="bg-white p-3 flex">
            <input
              type="text"
              // value={messageInput}
              // onChange={handleInputChange}
              placeholder="Type a messaage"
              className="bg-chat-bg px-3 py-2 flex-1 rounded-l-md outline-none"
            />
            <input
              type="submit"
              value="Send"
              className="px-4 py-2 bg-brand text-white rounded-r-md cursor-pointer"
            />
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl font-semibold">
            Select a user to start chatting.
          </p>
        </div>
      )}
    </>
  );
};

export default ChatRight;
