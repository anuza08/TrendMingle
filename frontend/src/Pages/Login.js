import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slices/userSlice";
import sideImage from "../Assests/images/SideImage.png";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError("All fields are required");
      return;
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
      const { success, message, error } = response;

      if (success) {
        dispatch(setCurrentUser(response));
        toast.success(message);
        localStorage.setItem("loggedInUser", response.name);
        localStorage.setItem("jwtToken", response.jwtToken);
        localStorage.setItem("role", response.role);
        localStorage.setItem("id", response.id);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        handleError(message);
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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Side Image - Hidden on mobile, shown on lg screens and up */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gray-100">
        <img
          src={sideImage}
          alt="Decorative"
          className="w-full h-full object-cover max-h-screen"
        />
      </div>

      {/* Login Form - Centered vertically on all screens */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 min-h-[calc(100vh-3rem)]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 lg:p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl lg:text-4xl mb-8 text-center font-playfair italic">
            Login
          </h1>
          <div className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={loginInfo.email}
                onChange={handleChange}
                autoFocus
                placeholder="Email"
                className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
              />
            </div>
            <div>
              <input
                value={loginInfo.password}
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-roboto transition-colors"
            >
              Login
            </button>
            <div className="text-center font-roboto text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-black font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default Login;
