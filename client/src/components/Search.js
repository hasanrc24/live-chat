import React from "react";

const Search = ({ searchData }) => {
  return (
    <div>
      {searchData.map((user) => {
        return (
          <div
            className="flex gap-3 my-1 bg-brand-bg px-4 py-3 rounded-md"
            key={user._id}
          >
            <img
              src={user.picture}
              alt="pic"
              className="h-6 w-6 rounded-full"
            />
            <p className="font-semibold">{user.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
