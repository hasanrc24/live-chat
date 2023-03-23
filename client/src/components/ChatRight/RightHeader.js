import React, { useEffect } from "react";
import { getSender } from "../../config/config";
import { SlOptions } from "react-icons/sl";
import UserModal from "../Modals/UserModal";

const RightHeader = ({
  openModal,
  setOpenModal,
  selectedChat,
  user,
  notifyError,
  notifySuccess,
  setReRender,
  reRender,
}) => {
  return (
    <div className="flex justify-between items-center px-3 py-2">
      <div className="flex gap-2">
        <img
          src={
            !selectedChat.isGroupChat
              ? getSender(user, selectedChat.users).picture
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="img"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-semibold">
            {selectedChat.isGroupChat
              ? selectedChat.chatName
              : getSender(user, selectedChat.users).name}
          </p>
          <span className="text-xs -mt-1 absolute">Online</span>
        </div>
      </div>
      <div onClick={() => setOpenModal(true)} className="pr-3 cursor-pointer">
        <SlOptions className="h-5 w-5" />
      </div>
      {openModal && (
        <UserModal
          setOpenModal={setOpenModal}
          selectedChat={selectedChat}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
          setReRender={setReRender}
          reRender={reRender}
        />
      )}
    </div>
  );
};

export default RightHeader;