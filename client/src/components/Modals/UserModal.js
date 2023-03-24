import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../config/config";
import { userSelector } from "../../redux/userSlice";
import SelectedBadge from "../SelectedBadge";
import axios from "axios";
import debounce from "lodash.debounce";
import Search from "../Search";
import {
  chatSelector,
  dispatchChats,
  dispatchSelectedChat,
} from "../../redux/chatSlice";

const UserModal = ({ setOpenModal, notifyError, notifySuccess }) => {
  const [loading, setLoading] = useState(false);
  const [chatName, setChatName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { user } = useSelector(userSelector);
  const { selectedChat, chats } = useSelector(chatSelector);

  const dispatch = useDispatch();

  const handleRename = async () => {
    setLoading(true);
    if (!chatName) {
      notifyError("Please enter chat name!");
      return;
    }

    try {
      const res = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        dispatch(dispatchSelectedChat(res.data));
        const temp = chats?.filter((ch) => selectedChat._id !== ch._id);
        dispatch(dispatchChats([res.data, ...temp]));
        notifySuccess("Group chat renamed successfully.");
        setChatName("");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      notifyError("Not updated!");
    }
  };

  const handleRemoveUser = async (userId) => {
    if (selectedChat.groupAdmin._id !== user._id && userId !== user._id) {
      notifyError("Only admin can remove user.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(
        "/api/chat/removeFromGroup",
        {
          chatId: selectedChat._id,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        if (user._id === userId) {
          dispatch(dispatchSelectedChat({}));
          const temp = chats?.filter((ch) => ch._id !== res.data._id);
          dispatch(dispatchChats(temp));
          notifySuccess("Left from group!");
        } else {
          dispatch(dispatchSelectedChat(res.data));
          notifySuccess("User removed");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      notifyError("Can't remove user.");
    }
  };

  const accessChat = async (userDt) => {
    if (selectedChat.users.find((us) => us._id === userDt._id)) {
      notifyError("User already added.");
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      notifyError("Only admin can add user.");
      return;
    }
    try {
      const res = await axios.put(
        "/api/chat/addToGroup",
        { chatId: selectedChat._id, userId: userDt._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(dispatchSelectedChat(res.data));
        notifySuccess("User added to group.");
        setSearchInput("");
      }
    } catch (error) {
      console.log(error);
      notifyError(error.response.data);
    }
  };

  const fetchUsers = useCallback(
    debounce(async (value) => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/user?search=${value}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setSearchData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
    setSearchInput(e.target.value);
    fetchUsers(e.target.value);
  };

  const handleLeave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        "/api/chat/removeFromGroup",
        {
          chatId: selectedChat._id,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        setOpenModal(false);
        dispatch(dispatchSelectedChat({}));
        const temp = chats?.filter((ch) => ch._id !== res.data._id);
        dispatch(dispatchChats(temp));
        notifySuccess("Left from group!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      notifyError("Some error occured.");
    }
  };

  return createPortal(
    <>
      <div
        onClick={() => setOpenModal(false)}
        className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black/60"
      />
      <div
        className={`box-border pb-6 z-50 fixed h-fit w-4/6 md:w-1/3 rounded-lg top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg`}
      >
        <button
          className="flex ml-auto mt-2 mr-2 text-3xl"
          onClick={() => setOpenModal(false)}
        >
          <IoCloseOutline />
        </button>
        {!selectedChat.isGroupChat ? (
          <div className="m-auto text-center">
            <h2 className="text-3xl font-semibold">
              {getSender(user, selectedChat.users).name}
            </h2>
            <img
              src={getSender(user, selectedChat.users).picture}
              alt="user"
              className="rounded-full h-24 w-24 my-3 m-auto"
            />
            <p>
              <span className="font-semibold">Email: </span>
              {getSender(user, selectedChat.users).email}
            </p>
          </div>
        ) : (
          <div className="m-auto text-center mx-4 break-words">
            <h2 className="text-3xl font-semibold mb-3">
              {selectedChat.chatName}
            </h2>
            <p>
              <span className="font-semibold">Admin: </span>
              {selectedChat.groupAdmin.name}
            </p>
            <div className="flex flex-wrap gap-1 justify-center my-4">
              {selectedChat?.users.map((user) => {
                return (
                  <SelectedBadge
                    key={user._id}
                    user={user}
                    handleRemoveUser={handleRemoveUser}
                  />
                );
              })}
            </div>
            <div className="my-4">
              <input
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                type="text"
                placeholder="Chat Name"
                className="border-b-2 border-brand/50 focus:border-brand outline-none px-2 py-1"
              />
              <button
                onClick={handleRename}
                className="ml-3 px-3 py-1 rounded-md bg-brand text-white font-semibold"
              >
                Update
              </button>
            </div>
            <input
              type="text"
              placeholder="Add user to group"
              value={searchInput}
              onChange={handleSearch}
              className="border-b-2 border-brand/50 focus:border-brand w-[80%] outline-none px-2 py-1"
            />
            {loading ? (
              <p>Loading...</p>
            ) : (
              searchInput.length > 0 &&
              searchData?.map((user) => {
                return (
                  <Search
                    setSearchValue={setSearchInput}
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user)}
                  />
                );
              })
            )}
            <button
              onClick={handleLeave}
              className="mt-3 px-3 py-2 rounded-md bg-red-600  text-white font-semibold"
            >
              Leave Group
            </button>
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default UserModal;
