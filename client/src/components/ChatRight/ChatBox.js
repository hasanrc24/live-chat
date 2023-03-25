import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { chatSelector } from "../../redux/chatSlice";
import { userSelector } from "../../redux/userSlice";
import Message from "./Message";
import ScrollableFeed from "react-scrollable-feed";

const ChatBox = ({ notifyError, notifySuccess }) => {
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const { user } = useSelector(userSelector);
  const { selectedChat } = useSelector(chatSelector);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`api/message/${selectedChat._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.status === 200) {
        setLoading(false);
        setAllMessages(res.data);
        // console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      notifyError("Error loading messages!");
    }
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageInput) {
      notifyError("Message can't be empty.");
      return;
    }

    try {
      setMessageInput("");
      const res = await axios.post(
        "/api/message",
        {
          content: messageInput,
          chatId: selectedChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        setAllMessages([...allMessages, res.data]);
      }
    } catch (error) {
      console.log(error);
      notifyError("Message was not sent!");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  return (
    <>
      <ScrollableFeed className="bg-chat-bg flex-1 pt-1 w-[90vw] md:w-full overflow-y-scroll chat-scroll">
        {loading ? (
          <p>Loading...</p>
        ) : (
          allMessages?.map((msg) => {
            return <Message key={msg._id} message={msg} />;
          })
        )}
      </ScrollableFeed>
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
    </>
  );
};

export default ChatBox;
