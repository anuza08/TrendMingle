import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [roleType, setRoleType] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setRoleType(localStorage.getItem("role"));
  });
  const handleLogout = (e) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/admin/login");
    }, 1000);
  };

  return (
    <>
      <div
        className="w-64   
            h-full
            fixed top-10 start-3 bottom-5 z-[60] rounded-lg
          dark:bg-gray-100 "
      >
        <h1 className="font-semibold">Admin dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        <h2 className="bg-red-500">{loggedInUser}</h2>
        <lu>
          <li>add product</li>
          <li>item list</li>
          <li>update shipping status</li>
        </lu>
      </div>
    </>
  );
};

export default AdminDashboard;
