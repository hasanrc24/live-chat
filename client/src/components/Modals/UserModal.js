import React from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getSender } from "../../config/config";
import { userSelector } from "../../redux/userSlice";

const UserModal = ({ setOpenModal, selectedChat }) => {
  const { user } = useSelector(userSelector);

  return createPortal(
    <>
      <div
        onClick={() => setOpenModal(false)}
        className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black/60"
      />
      <div
        className={`box-border pb-6 z-50 fixed h-fit w-4/6 md:w-1/3 rounded-lg top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg`}
      >
        <button
          className="flex ml-auto mt-2 mr-2 text-3xl"
          onClick={() => setOpenModal(false)}
        >
          <IoCloseOutline />
        </button>
        {!selectedChat.isGroupChat ? (
          <div className="m-auto text-center">
            <h2 className="text-3xl font-semibold">
              {getSender(user, selectedChat.users).name}
            </h2>
            <img
              src={getSender(user, selectedChat.users).picture}
              alt="user"
              className="rounded-full h-24 w-24 my-3 m-auto"
            />
            <p>
              <span className="font-semibold">Email: </span>
              {getSender(user, selectedChat.users).name}
            </p>
          </div>
        ) : (
          <div className="m-auto text-center">
            <h2 className="text-3xl font-semibold">{selectedChat.chatName}</h2>
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default UserModal;
