import React, { useCallback, useEffect, useState } from "react";
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
import GroupChatModal from "./Modals/GroupChatModal";
import toast, { Toaster } from "react-hot-toast";

const ChatLeft = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { chats } = useSelector(chatSelector);
  const localUser = JSON.parse(localStorage.getItem("userInfo"));

  const fetchUsers = useCallback(
    debounce(async (value) => {
      try {
        const { data } = await axios.get(`/api/user?search=${value}`, {
          headers: {
            Authorization: `Bearer ${localUser.token}`,
          },
        });
        setSearchData(data);
      } catch (error) {
        console.log(error);
        notifyError(
          error.response.data.message
            ? error.response.data.message
            : error.response.data
        );
      }
    }, 200),
    []
  );

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    fetchUsers(e.target.value);
  };

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
      setSearchValue("");
      if (!chats.find((c) => c._id === data.id)) {
        dispatch(dispatchSelectedChat(data));
        dispatch(dispatchChats([...chats, data]));
        setAllChats([data, ...chats]);
      }
    } catch (error) {
      console.log(error);
      notifyError(error.response.data);
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
    <>
      <div className="p-3">
        <div className="flex justify-between items-center border-b-2 pb-3">
          <p className="font-semibold text-lg">My Chats</p>
          <button
            onClick={() => setOpenGroupModal(true)}
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
            value={searchValue}
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
                handleFunction={() => accessChat(user._id)}
              />
            );
          })
        ) : (
          <div className=" box-border container-snap">
            {allChats?.map((chat) => {
              return <MyChats key={chat._id} chat={chat} />;
            })}
          </div>
        )}
        {openGroupModal && (
          <GroupChatModal
            openGroupModal={openGroupModal}
            setOpenGroupModal={setOpenGroupModal}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
            setAllChats={setAllChats}
          />
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ChatLeft;
