import React, { useState } from "react";
import { useSelector } from "react-redux";
import { chatSelector } from "../redux/chatSlice";
import { userSelector } from "../redux/userSlice";
import ChatBox from "./ChatRight/ChatBox";
import RightHeader from "./ChatRight/RightHeader";
import Modal from "./Modals/Modal";

const ChatRight = () => {
  const [chatOptionModal, setChatOptionModal] = useState(false);

  const { user } = useSelector(userSelector);
  const { selectedChat } = useSelector(chatSelector);

  return (
    <div className="h-full">
      {Object.keys(selectedChat).length !== 0 ? (
        <>
          <RightHeader
            openModal={chatOptionModal}
            setOpenModal={setChatOptionModal}
            selectedChat={selectedChat}
            user={user}
          />
          <ChatBox />
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl font-semibold">
            Select a user to start chatting.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatRight;
