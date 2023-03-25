import React from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../../config/config";
import { userSelector } from "../../redux/userSlice";

const Message = ({ message }) => {
  const { user } = useSelector(userSelector);
  return (
    <>
      {message.sender.email === user.email ? (
        <div className="flex justify-end items-start gap-2 m-2">
          <div className="-mt-2 max-w-[70%]">
            <p className="text-xs mb-[.15rem] font-semibold text-gray-500 text-right">
              {message.sender.name}
            </p>
            <p className="bg-brand break-words text-white px-3 py-1 rounded-l-lg rounded-br-lg max-w-max ml-auto">
              {message.content}
              <span className="pl-3 text-[.6rem] text-white">
                {formatTime(message.updatedAt)}
              </span>{" "}
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
          <div className="-mt-2 max-w-[70%]">
            <p className="text-xs mb-[.15rem] font-semibold text-gray-500">
              {message.sender.name}
            </p>
            <p className="bg-white break-words pl-3 pr-2 py-1 rounded-r-lg rounded-bl-lg max-w-max mr-auto">
              {message.content}
              <span className="pl-3 text-[.6rem] text-gray-500">
                {formatTime(message.updatedAt)}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
