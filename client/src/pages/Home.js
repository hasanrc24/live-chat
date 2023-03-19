import React from "react";
import ChatLeft from "../components/ChatLeft";
import ChatRight from "../components/ChatRight";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-brand-bg h-screen flex justify-center items-center">
      <div className="h-[80%] w-[70%] bg-white rounded-xl shadow-xl overflow-hidden">
        <Header />
        <div className="grid grid-cols-3 h-full">
          <div className="border-r-2">
            <ChatLeft />
          </div>
          <div className="col-span-2">
            <ChatRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
