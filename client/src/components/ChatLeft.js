import React, { useState } from "react";
import { BiPlus, BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import { userSelector } from "../redux/userSlice/userSlice";
import { useSelector } from "react-redux";
import Search from "./Search";
import debounce from "lodash.debounce";

const ChatLeft = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { user } = useSelector(userSelector);

  const fetchUsers = async (value) => {
    const { data } = await axios.get(`/api/user?search=${value}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setSearchData(data);
    console.log("first");
  };

  const handleSearch = debounce((e) => {
    setSearchValue(e.target.value);
    fetchUsers(e.target.value);
  }, 400);
  return (
    <div className="p-3">
      <div className="flex justify-between items-center border-b-2 pb-3">
        <p className="font-semibold text-lg">My Chats</p>
        <button className="flex items-center gap-1 bg-brand/70 rounded px-2 py-1 text-white">
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
      {searchValue.length > 0 && <Search searchData={searchData} />}

      <div className="hidden md:block">
        <div className="flex gap-3 border-b items-center hover:bg-chat-bg md:-mr-3 px-3 py-2 cursor-pointer rounded-md md:rounded-none md:rounded-l-md">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="prof-img"
            />
          </div>
          <div className="text-chat-text">
            <p className="font-semibold">Adam Hills</p>
            <p className="text-sm">Hello there how are you?</p>
          </div>
        </div>

        <div className="flex gap-3 border-b items-center hover:bg-chat-bg md:-mr-3 px-3 py-2 cursor-pointer rounded-md md:rounded-none md:rounded-l-md">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt="prof-img"
            />
          </div>
          <div className="text-chat-text">
            <p className="font-semibold">Adam Hills</p>
            <p className="text-sm">Hello there how are you?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeft;
