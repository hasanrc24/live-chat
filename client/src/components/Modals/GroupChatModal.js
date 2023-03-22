import axios from "axios";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";
import Search from "../Search";
import SelectedBadge from "../SelectedBadge";
import { chatSelector, dispatchChats } from "../../redux/chatSlice";

const GroupChatModal = ({
  openGroupModal,
  setOpenGroupModal,
  notifySuccess,
  notifyError,
}) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector(userSelector);
  const { chats } = useSelector(chatSelector);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearch(query);

    try {
      const { data } = await axios.get(`/api/user?search=${search}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const selectedUserIds = selectedUsers.map((user) => user._id);

      setSearchResult(data.filter((fil) => !selectedUserIds.includes(fil._id)));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError("Some error occured.");
    }
  };

  const handleGroup = (user) => {
    if (
      selectedUsers.length > 0 &&
      selectedUsers.some((us) => us._id === user._id)
    ) {
      return;
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupChatName) {
      notifyError("Group chat must have a name!");
      return;
    }
    if (selectedUsers.length === 0) {
      notifyError("Group chat must have users!");
      return;
    }

    try {
      const res = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((us) => us._id)),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(dispatchChats([res.data, ...chats]));
        notifySuccess("Chat created successfully!");
        setOpenGroupModal(false);
      }
    } catch (error) {
      notifyError(error.response.data);
    }
  };

  return createPortal(
    <>
      <div
        onClick={() => setOpenGroupModal(false)}
        className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black/60"
      />
      <div
        className={`box-border pb-6 z-50 fixed h-fit w-4/6 md:w-1/3 rounded-lg top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg`}
      >
        <button
          className="flex ml-auto mt-2 mr-2 text-3xl"
          onClick={() => setOpenGroupModal(false)}
        >
          <IoCloseOutline />
        </button>
        <div className="m-auto text-center">
          <h2 className="text-2xl font-semibold">Create Group chat</h2>
          <form
            onSubmit={handleSubmit}
            className="my-3 flex justify-center items-center flex-col "
          >
            <input
              type="text"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
              className="border-b-2 mb-3 border-brand/50 focus:border-brand outline-none px-2 py-2 w-[70%]"
              placeholder="Group Chat Name"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-b-2 mb-2 border-brand/50 focus:border-brand outline-none px-2 py-2 w-[70%]"
              placeholder="Add Users eg: John, Jane"
            />
            {selectedUsers.length > 0 && (
              <div className="flex gap-2 w-[72%] flex-wrap">
                {selectedUsers?.map((user) => {
                  return (
                    <SelectedBadge
                      key={user._id}
                      user={user}
                      handleRemoveUser={handleRemoveUser}
                    />
                  );
                })}
              </div>
            )}
            {loading ? (
              <span>Loading...</span>
            ) : (
              search.length > 0 &&
              searchResult?.slice(0, 4).map((user) => {
                return (
                  <div key={user._id} className="w-[70%]">
                    <Search
                      user={user}
                      handleFunction={() => handleGroup(user)}
                      setSearchValue={setSearch}
                    />
                  </div>
                );
              })
            )}
            <input
              type="submit"
              value="Create Chat"
              className="text-white mt-2 bg-brand px-4 py-2 rounded-md font-semibold cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default GroupChatModal;
