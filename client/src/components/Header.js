import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";

const Header = () => {
  return (
    <div className="bg-brand text-white p-4 flex justify-between items-center">
      <p className="font-semibold">Live Chat</p>
      <div className="font-semibold flex gap-3">
        <div className="flex items-center cursor-pointer">
          <IoNotificationsSharp className="h-5 w-5" />
        </div>
        <div className="cursor-pointer">
          <img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            alt="profile img"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
