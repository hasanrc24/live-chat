import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/userSlice/userSlice";
import Modal from "./Modal";

const ChatRight = () => {
  const { user } = useSelector(userSelector);
  return <div className="p-3"></div>;
};

export default ChatRight;
