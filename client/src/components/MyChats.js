import React from "react";

const MyChats = ({ chat }) => {
  return (
    <div className="flex gap-3 border-b items-center hover:bg-chat-bg md:-mr-3 px-3 py-2 cursor-pointer rounded-md md:rounded-none md:rounded-l-md">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img src={chat.users[1].picture} alt="prof-img" />
      </div>
      <div className="text-chat-text">
        <p className="font-semibold">
          {chat.isGroupChat ? chat.chatName : chat.users[1].name}
        </p>
        <p className="text-sm">Hello there how are you?</p>
      </div>
    </div>
  );
};

export default MyChats;
