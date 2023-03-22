import React from "react";
import { IoClose } from "react-icons/io5";

const SelectedBadge = ({ user, handleRemoveUser }) => {
  return (
    <span className="bg-brand/50 flex justify-between items-center pl-2 pr-1 py-1 rounded-md">
      <p>{user.name}</p>
      <IoClose
        className="cursor-pointer"
        onClick={() => handleRemoveUser(user._id)}
      />
    </span>
  );
};

export default SelectedBadge;
