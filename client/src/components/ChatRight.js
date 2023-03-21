import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/userSlice";
import Modal from "./Modal";

const ChatRight = () => {
  const { user } = useSelector(userSelector);
  return <div className="p-3">Chat Right</div>;
};

export default ChatRight;
