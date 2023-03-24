import React from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../../config/config";
import { userSelector } from "../../redux/userSlice";

const Message = ({ message }) => {
  const { user } = useSelector(userSelector);
  return (
    <div className="">
      {message.sender.email === user.email ? (
        <div className="flex justify-end items-start gap-2 m-2">
          <div className="-mt-2">
            <span className="text-xs font-semibold text-gray-500">
              {message.sender.name},{" "}
              <span>{formatTime(message.updatedAt)}</span>{" "}
            </span>
            <p className="bg-brand text-white px-2 py-1 rounded-l-lg rounded-br-lg max-w-max ml-auto">
              {message.content}
            </p>
          </div>
          <img
            src={message.sender.picture}
            alt="user"
            className="h-7 w-7 rounded-full"
          />
        </div>
      ) : (
        <div className="flex justify-start items-start gap-2 m-2">
          <img
            src={message.sender.picture}
            alt="user"
            className="h-7 w-7 rounded-full"
          />
          <div className="-mt-2">
            <span className="text-xs font-semibold text-gray-500">
              {message.sender.name},{" "}
              <span>{formatTime(message.updatedAt)}</span>{" "}
            </span>
            <p className="bg-white px-2 py-1 rounded-r-lg rounded-bl-lg max-w-max mr-auto">
              {message.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
