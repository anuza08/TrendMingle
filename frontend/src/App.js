import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Collection from "./Pages/Collection";
import AdminLogin from "./Pages/Admin/Auth/AdminLogin";
import AdminSignUp from "./Pages/Admin/Auth/AdminSignUp";
import AdminDashboard from "./Pages/Admin/AdminDashbord";
import ProductDetails from "./Pages/Components/ProductDetails";
import Footer from "./Pages/Components/Footer";
import { Toaster } from "react-hot-toast";
import CartItems from "./Pages/Cart/CartItems";

function App() {
  const role = localStorage.getItem("role");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      {role === "user" && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {role === "user" && (
            <Route path="*" element={<Navigate to="/home" replace />} />
          )}
          {role === "admin" && (
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          )}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<CartItems />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/admin/*">
            <Route path="login" element={<AdminLogin />} />
            <Route path="signup" element={<AdminSignUp />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
