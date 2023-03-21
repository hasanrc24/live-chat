import React, { useEffect, useState } from "react";
import { BiPlus, BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import { userSelector } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import debounce from "lodash.debounce";
import {
  chatSelector,
  dispatchChats,
  dispatchSelectedChat,
} from "../redux/chatSlice";
import MyChats from "./MyChats";

const ChatLeft = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [allChats, setAllChats] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { chats } = useSelector(chatSelector);
  console.log(user);

  const fetchUsers = async (value) => {
    try {
      const { data } = await axios.get(`/api/user?search=${value}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSearchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = debounce((e) => {
    setSearchValue(e.target.value);
    fetchUsers(e.target.value);
  }, 300);

  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post(
        "/api/chat",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!chats.find((c) => c._id === data.id)) {
        dispatch(dispatchSelectedChat(data));
        dispatch(dispatchChats([...chats, data]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChats = async (token) => {
    try {
      const { data } = await axios.get("/api/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllChats(data);
      dispatch(dispatchChats(data));
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const info = JSON.parse(localStorage.getItem("userInfo"));
      fetchChats(info.token);
    }
  }, []);
  return (
    <div className="p-3">
      <div className="flex justify-between items-center border-b-2 pb-3">
        <p className="font-semibold text-lg">My Chats</p>
        <button
          // onClick={fetchChats}
          className="flex items-center gap-1 bg-brand/70 rounded px-2 py-1 text-white"
        >
          <p>Group chat</p>
          <BiPlus />
        </button>
      </div>
      <div className="my-3 flex items-center bg-chat-bg pl-2 rounded-md">
        <label htmlFor="search_id">
          <BiSearchAlt2 className="h-6 w-6 text-gray-500" />
        </label>
        <input
          type="text"
          id="search_id"
          placeholder="Search..."
          className="bg-chat-bg w-full pl-1 pr-3 py-2 rounded-md outline-none"
          // value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {searchValue.length > 0 ? (
        searchData?.map((user) => {
          return (
            <Search
              setSearchValue={setSearchValue}
              key={user._id}
              user={user}
              accessChat={() => accessChat(user._id)}
            />
          );
        })
      ) : (
        <div className=" box-border ">
          {allChats?.map((chat) => {
            return <MyChats key={chat._id} chat={chat} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ChatLeft;
