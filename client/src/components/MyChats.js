import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../config/config";
import {
  chatSelector,
  dispatchSelectedChat,
  removeNotification,
} from "../redux/chatSlice";
import { toggleRight } from "../redux/toggleSlice";
import { userSelector } from "../redux/userSlice";

const MyChats = ({ chat }) => {
  const dispatch = useDispatch();
  const { selectedChat, notification } = useSelector(chatSelector);
  const { user } = useSelector(userSelector);

  const handleSelectChat = () => {
    dispatch(toggleRight());
    dispatch(dispatchSelectedChat(chat));
    let found = notification.find((noti) => noti.chat._id === chat._id);
    if (found) {
      dispatch(removeNotification(found.chat));
    }
  };
  return (
    <div
      onClick={handleSelectChat}
      className={`flex gap-3 border-b items-center hover:bg-chat-bg ${
        selectedChat._id === chat._id && "bg-chat-bg"
      } md:-mr-3 p-3 py-2 cursor-pointer rounded-md md:rounded-none md:rounded-l-md`}
    >
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img
          src={
            !chat.isGroupChat
              ? getSender(user, chat.users).picture
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="prof-img"
          className="object-cover"
        />
      </div>
      <div className="text-chat-text">
        <p className="font-semibold">
          {chat.isGroupChat ? chat.chatName : getSender(user, chat.users).name}
        </p>
        <p className="text-sm">
          {chat?.latestMessage?.content?.length > 50
            ? chat.latestMessage.content.substring(0, 30) + "..."
            : chat?.latestMessage?.content}
        </p>
      </div>
    </div>
  );
};

export default MyChats;
