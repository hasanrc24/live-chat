import React from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ openModal, setOpenModal, user }) => {
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
        <div className="m-auto text-center">
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <img
            src={user.picture}
            alt="user"
            className="rounded-full h-24 w-24 my-3 m-auto"
          />
          <p>
            <span className="font-semibold">Email: </span>
            {user.email}
          </p>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
