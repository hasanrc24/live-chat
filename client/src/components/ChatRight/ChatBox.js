import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  chatSelector,
  dispatchChats,
  dispatchNotification,
  dispatchSelectedChat,
} from "../../redux/chatSlice";
import { userSelector } from "../../redux/userSlice";
import Message from "./Message";
import ScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";
import Lottie from "lottie-react";
import typingAnimation from "../../typing.json";

const ChatBox = ({ notifyError, notifySuccess }) => {
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [socketConnect, setSocketConnect] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user } = useSelector(userSelector);
  const { chats, selectedChat, notification } = useSelector(chatSelector);
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const ENDPOINT = "http://localhost:5000";
  let socket = io.connect(ENDPOINT);

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
        socket.emit("join_chat", selectedChat._id);
      }
    } catch (error) {
      console.log(error);
      notifyError("Error loading messages!");
    }
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    if (!socketConnect) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id, user._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 2000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop_typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageInput) {
      notifyError("Message can't be empty.");
      return;
    }

    socket.emit("stop_typing", selectedChat._id);

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
        socket.emit("new_message", res.data);
        const filteredChats = chats.filter(
          (ch) => ch._id !== res.data.chat._id
        );
        dispatch(dispatchChats([res.data.chat, ...filteredChats]));
      }
    } catch (error) {
      console.log(error);
      notifyError("Message was not sent!");
    }
  };

  useEffect(() => {
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnect(true));
    socket.on("typing", (typingUserId) => {
      if (typingUserId !== user._id) {
        setIsTyping(true);
      }
    });
    socket.on("stop_typing", (typingUserId) => {
      if (typingUserId !== user._id) {
        setIsTyping(false);
      }
    });
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message_received", (newMsgR) => {
      if (
        Object.keys(selectedChat).length === 0 ||
        selectedChat._id !== newMsgR.chat._id
      ) {
        if (!notification.includes(newMsgR)) {
          // dispatch(dispatchNotification(newMsgR));
        }
      } else {
        setAllMessages((prevMsgs) => [...prevMsgs, newMsgR]);
      }
    });
  }, [socket]);

  return (
    <>
      <ScrollableFeed className="bg-chat-bg flex flex-col flex-grow pt-1 w-[90vw] md:w-full overflow-y-auto chat-scroll">
        {loading ? (
          <p className="flex justify-center items-center">Loading...</p>
        ) : allMessages.length === 0 ? (
          <p className="flex justify-center items-center">
            No messages to display.
          </p>
        ) : (
          <>
            <div className="flex-grow"></div>
            {allMessages?.map((msg, i) => {
              return <Message key={msg._id} message={msg} index={i} />;
            })}
            {isTyping && (
              <>
                {/* <div className="flex-grow"></div> */}
                <div className="mr-auto">
                  <Lottie animationData={typingAnimation} loop={true} />
                </div>
              </>
            )}
          </>
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
