import React from "react";
import { BiPlus } from "react-icons/bi";

const ChatLeft = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center border-b-2 pb-3">
        <p className="font-semibold text-lg">My Chats</p>
        <button className="flex items-center gap-1 bg-brand/70 rounded px-2 py-1 text-white">
          <p>Group chat</p>
          <BiPlus />
        </button>
      </div>
      <div className="my-3">
        <input
          type="text"
          placeholder="Search..."
          className="bg-chat-bg w-full px-3 py-2 rounded-md outline-none"
        />
      </div>

      <div className="hidden md:block">
        <div className="flex gap-3 border-b items-center hover:bg-chat-bg md:-mr-3 px-3 py-2 cursor-pointer rounded-md md:rounded-none md:rounded-l-md">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="prof-img"
            />
          </div>
          <div className="text-chat-text">
            <p className="font-semibold">Adam Hills</p>
            <p className="text-sm">Hello there how are you?</p>
          </div>
        </div>

        <div className="flex gap-3 border-b items-center hover:bg-chat-bg md:-mr-3 px-3 py-2 cursor-pointer rounded-md md:rounded-none md:rounded-l-md">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="prof-img"
            />
          </div>
          <div className="text-chat-text">
            <p className="font-semibold">Adam Hills</p>
            <p className="text-sm">Hello there how are you?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeft;
