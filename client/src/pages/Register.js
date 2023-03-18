import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  console.log(imageUrl);

  return (
    <div className="bg-brand-bg h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 shadow-xl">
        <p className="text-2xl text-center mb-4 font-semibold">Live Chat</p>
        <form className="flex flex-col gap-2 my-4">
          {/* <label htmlFor="email">Email address</label> */}
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
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

          {imageUrl ? (
            <div className="flex mt-2">
              <img
                src={imageUrl}
                className="h-10 object-contain rounded-lg"
                alt="Selected file"
              />
              <IoMdCloseCircle
                className="-ml-2 -mt-2 z-10 text-brand/90 cursor-pointer"
                onClick={() => setImageUrl(null)}
              />
            </div>
          ) : (
            <>
              <label
                htmlFor="file"
                onClick={handleClick}
                className="cursor-pointer flex gap-2 mt-2"
              >
                <img
                  className="h-7"
                  src="https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png"
                  alt="img-upload"
                />
                Upload Image
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}
          <input
            type="submit"
            value="Sign Up"
            className=" mt-4 px-8 py-2 font-semibold cursor-pointer text-white bg-brand/90 rounded-lg m-auto"
          />
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
