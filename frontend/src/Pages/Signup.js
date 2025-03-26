import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";
import { Link } from "react-router-dom";
import sideImage from "../Assests/images/SideImage.png";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      handleError("All fields are required");
      return;
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const response = await result.json();
      const { success, message, error } = response;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        handleError(message);
      }

      setSignupInfo({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      handleError("Error during signup");
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

      {/* Signup Form - Centered vertically on all screens */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 min-h-[calc(100vh-3rem)]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 lg:p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl lg:text-4xl mb-8 text-center font-playfair italic">
            Create Account
          </h1>
          <div className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={signupInfo.name}
                onChange={handleChange}
                autoFocus
                placeholder="Name"
                className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-roboto transition-colors"
            >
              Sign Up
            </button>
            <div className="text-center font-roboto text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-medium hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Signup;
