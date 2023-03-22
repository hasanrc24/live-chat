import React from "react";

const Search = ({ user, handleFunction, setSearchValue }) => {
  return (
    <div
      onClick={() => {
        handleFunction();
        setSearchValue("");
      }}
      className="flex gap-3 my-1 bg-brand-bg px-4 py-3 rounded-md cursor-pointer hover:bg-brand hover:text-white transition-all"
    >
      <img src={user.picture} alt="pic" className="h-6 w-6 rounded-full" />
      <p className="font-semibold">{user.name}</p>
    </div>
  );
};

export default Search;
