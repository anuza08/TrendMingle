import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import ItemList from "./Components/ItemList";
import UpdateShippingStatus from "./Components/UpdateShippingStatus";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const roleType = localStorage.getItem("role");
  const jwtToken = localStorage.getItem("jwtToken");

  const handleLogout = () => {
    ["jwtToken", "loggedInUser", "role"].forEach((item) =>
      localStorage.removeItem(item)
    );
    setTimeout(() => navigate("/admin/login"), 1000);
  };

  const renderContent = () => {
    const components = {
      addProduct: (
        <div>
          <AddProduct token={jwtToken} />
        </div>
      ),
      itemList: (
        <div>
          <ItemList />
        </div>
      ),
      updateShipping: (
        <div>
          <UpdateShippingStatus />
        </div>
      ),
      overview: (
        <div>
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
          <p className="text-gray-600">
            Select an option from the sidebar to manage your admin tasks.
          </p>
        </div>
      ),
    };
    return components[activeTab];
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <p className="mb-6 text-sm text-gray-400">Admin Panel</p>
        <nav className="flex-grow">
          {["addProduct", "itemList", "updateShipping"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeTab === tab ? "bg-gray-700" : "hover:bg-gray-700"
              } transition`}
            >
              {tab === "addProduct"
                ? "Add Product"
                : tab === "itemList"
                ? "Item List"
                : "Update Shipping Status"}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex-grow bg-gray-100 p-10">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
