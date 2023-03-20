import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoNotificationsSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserInfo } from "../redux/userSlice/userSlice";

const Header = ({ showMenu, setShowMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(addUserInfo({}));
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    <div className="bg-brand text-white p-4 flex justify-between items-center">
      <p className="font-semibold">Live Chat</p>
      <div className="font-semibold flex gap-3">
        <div className="flex items-center cursor-pointer">
          <IoNotificationsSharp className="h-5 w-5" />
        </div>
        <div
          // onBlur={() => setShowMenu(!showMenu)}
          // onFocus={() => setShowMenu(!showMenu)}
          onClick={() => setShowMenu(!showMenu)}
          tabIndex="0"
          className="cursor-pointer flex items-center  transition-all"
        >
          <img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            alt="profile img"
            className="h-8 w-8 rounded-full"
          />
          <div className="relative">
            <BiChevronDown className="h-7 w-7" />
            {showMenu && (
              <div className="absolute flex flex-col gap-2 right-0 top-11 py-2 px-3 text-white bg-brand z-50">
                <p>Profile</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
