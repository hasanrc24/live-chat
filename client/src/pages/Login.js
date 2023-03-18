import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-brand-bg h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 ">
        <p className="text-2xl text-center mb-4 font-semibold">Live Chat</p>
        <form className="flex flex-col gap-2 my-4">
          {/* <label htmlFor="email">Email address</label> */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
            required
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
            required
          />
          <input
            type="submit"
            value="Login"
            className=" mt-4 px-8 py-2 font-semibold cursor-pointer text-white bg-brand/90 rounded-lg m-auto"
          />
          <button className="border-2 border-brand rounded-lg m-auto mt-3 py-2 px-4 hover:bg-brand  hover:text-white transition-all font-semibold">
            Demo Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
