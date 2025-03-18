import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slices/userSlice";
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const response = await result.json();
      const { success, messsage, error, role } = response;

      if (success) {
        dispatch(setCurrentUser(response));
        toast.success(messsage);
        localStorage.setItem("loggedInUser", response.name);
        localStorage.setItem("jwtToken", response.jwtToken);
        localStorage.setItem("role", response.role);
        localStorage.setItem("id", response.id);
        handleSuccess(messsage);
        setTimeout(() => {
          Navigate("/home");
        }, 1000);
      } else if (error) {
        handleError(messsage);
      } else if (!success) {
        handleError(messsage);
      }
      setLoginInfo({
        email: "",
        password: "",
      });
    } catch (error) {
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
            Login
          </h1>
          <div>
            {/* <label>Email</label> */}
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              autoFocus
              placeholder="Email"
              className="w-full p-3 rounded border border-black  mb-7 text-black focus:outline-none focus:right-2 foucs:ring-blue-500 font-roboto"
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              value={loginInfo.password}
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
            <Link to="/signup"> SignUp</Link>
          </span>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Login;
