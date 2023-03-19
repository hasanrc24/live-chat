import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-brand-bg h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 shadow-xl">
        <p className="text-2xl text-center mb-4 font-semibold">Live Chat</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4">
          {/* <label htmlFor="email">Email address</label> */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {loading && <span>Loading...</span>}
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
