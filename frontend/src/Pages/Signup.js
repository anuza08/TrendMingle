import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignUpInfo = { ...signupInfo };
    copySignUpInfo[name] = value;
    setSignupInfo(copySignUpInfo);
  };
  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const response = await result.json();
      const { success, message, error } = response;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      } else if (error) {
        handleError(message);
      } else if (!success) {
        handleError(message);
      }
      setSignupInfo({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      handleError("Error");
    }
  };
  return (
    <>
      <div className="bg-white items-center flex flex-row min-h-screen justify-center ">
        <form
          onSubmit={handleSubmit}
          className=" text-back p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-4xl  mb-12 text-center font-playfair italic">
            Sign Up
          </h1>
          <div>
            {/* <label className="block text-sm font-medium mb-1">Name</label> */}
            <input
              type="name"
              name="name"
              value={signupInfo.name}
              autoFocus
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 rounded border border-black  mb-7 text-black focus:outline-none focus:right-2 foucs:ring-blue-500 font-roboto"
            />
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              type="email"
              name="email"
              value={signupInfo.email}
              // autoFocus
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded border border-black  mb-7 text-black focus:outline-none focus:right-2 foucs:ring-blue-500 font-roboto"
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              type="password"
              name="password"
              value={signupInfo.password}
              // autoFocus
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded border border-black mb-7 text-black focus:outline-none focus:right-2 foucs:ring-blue-500 font-roboto"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-roboto"
          >
            Sign Up
          </button>
          <span className="font-roboto text-gray-700">
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Signup;
