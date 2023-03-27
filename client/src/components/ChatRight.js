import React from "react";
import { useSelector } from "react-redux";
import { chatSelector } from "../redux/chatSlice";
import ChatBox from "./ChatRight/ChatBox";
import RightHeader from "./ChatRight/RightHeader";

const ChatRight = ({
  notifyError,
  notifySuccess,
  chatOptionModal,
  setChatOptionModal,
}) => {
  const { selectedChat } = useSelector(chatSelector);

  return (
    <>
      <div className="flex flex-col h-[90vh] md:h-[80vh] pt-16 z-0">
        {Object.keys(selectedChat).length > 0 && (
          <RightHeader
            openModal={chatOptionModal}
            setOpenModal={setChatOptionModal}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          />
        )}
        <ChatBox notifyError={notifyError} notifySuccess={notifySuccess} />
      </div>
    </>
  );
};

export default ChatRight;
