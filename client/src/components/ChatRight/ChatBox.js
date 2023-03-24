import React, { useState } from "react";

const ChatBox = ({ notifyError, notifySuccess }) => {
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const handleInputChange = (e) => {
    setMessageInput(e.target.valuee);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.length > 0) {
      notifyError("Message can't be empty.");
      return;
    }
  };
  return (
    <div className="bg-chat-bg h-full -mt-14 pt-14 z-10 relative flex flex-col">
      <div className="flex-1  p-3">
        {loading ? <p>Loading...</p> : <div>Messages</div>}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-3 flex">
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          placeholder="Type a messaage"
          className="bg-chat-bg px-3 py-2 flex-1 rounded-l-md outline-none"
        />
        <input
          type="submit"
          value="Send"
          className="px-4 py-2 bg-brand text-white rounded-r-md cursor-pointer"
        />
      </form>
    </div>
  );
};

export default ChatBox;
