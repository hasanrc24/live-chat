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
    // <div className="bg-chat-bg h-64 -mt-14 pt-14 p-3 flex flex-col">
    //   {/* <div className="flex-1 p-3 h-full"> */}
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <div className="flex flex-col justify-end h-full overflow-scroll">
    //       {allMessages?.map((msg) => {
    //         return <Message key={msg._id} message={msg} />;
    //       })}
    //     </div>
    //   )}
    //   {/* </div> */}

    //   <form onSubmit={handleSubmit} className="bg-white p-3 flex">
    //     <input
    //       type="text"
    //       value={messageInput}
    //       onChange={handleInputChange}
    //       placeholder="Type a messaage"
    //       className="bg-chat-bg px-3 py-2 flex-1 rounded-l-md outline-none"
    //     />
    //     <input
    //       type="submit"
    //       value="Send"
    //       className="px-4 py-2 bg-brand text-white rounded-r-md cursor-pointer"
    //     />
    //   </form>
    // </div>

    <ScrollableFeed className="bg-chat-bg flex-1 h-[30vh] overflow-y-scroll">
      {loading ? (
        <p>Loading...</p>
      ) : (
        allMessages?.map((msg) => {
          return <Message key={msg._id} message={msg} />;
        })
      )}
      {/* <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700">
            <p>Hello, how are you?</p>
          </div>
        </div>
      </div>

      <div className="flex items-start mb-4 justify-end">
        <div className="flex-1 text-right">
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            <p>Hey, I'm good thanks. How about you?</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-start mb-4 justify-end">
        <div className="flex-1 text-right">
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            <p>Hey, I'm good thanks. How about you?</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-start mb-4 justify-end">
        <div className="flex-1 text-right">
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            <p>Hey, I'm good thanks. How about you?</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-start mb-4 justify-end">
        <div className="flex-1 text-right">
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            <p>Hey, I'm good thanks. How about you?</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-start mb-4 justify-end">
        <div className="flex-1 text-right">
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            <p>Hey, I'm good thanks. How about you?</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-start mb-4 justify-end">
        <div className="flex-1 text-right">
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            <p>Hey, I'm good thanks. How about you?</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-start mb-4 justify-end">
        <div className="flex-1 text-right">
          <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            <p>Hey, I'm good thanks. How about you?</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile pic"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div> */}
    </ScrollableFeed>
  );
};

export default ChatBox;
