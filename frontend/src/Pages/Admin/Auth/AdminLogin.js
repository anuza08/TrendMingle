import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../../Utils";
import { ToastContainer } from "react-toastify";

const AdminLogin = () => {
  const [adminLoginInfo, setAdminLoginInfo] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...adminLoginInfo };
    copyLoginInfo[name] = value;
    setAdminLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = adminLoginInfo;
    if (!email || !password) {
      handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8080/admin/login";
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminLoginInfo),
      });
      const response = await result.json();
      const { success, message, error } = response;
      if (success) {
        handleSuccess("Login successfull");
        setTimeout(() => {
          Navigate("/admin/dashboard");
        }, 1000);
      } else if (!success) {
        handleError(message);
      } else if (error) {
        handleError(message);
      }
      setAdminLoginInfo({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      handleError(error);
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
            Login
          </h1>
          <div>
            {/* <label>Email</label> */}
            <input
              type="email"
              name="email"
              value={adminLoginInfo.email}
              onChange={handleChange}
              autoFocus
              placeholder="Email"
              className="w-full p-3 rounded border border-black  mb-7 text-black focus:outline-none focus:right-2 foucs:ring-blue-500 font-roboto"
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              value={adminLoginInfo.password}
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              // autoFocus
              className="w-full p-3 rounded border border-black  mb-7 text-black focus:outline-none focus:right-2 foucs:ring-blue-500 font-roboto"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-roboto"
          >
            Login
          </button>
          <span className="font-roboto text-gray-700">
            Don't have an account?
            <Link to="/admin/signup"> SignUp</Link>
          </span>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
