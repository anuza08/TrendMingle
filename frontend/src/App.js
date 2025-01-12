import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";
    document.head.appendChild(link);
  }, []);
  return (
    <>
      <div>
        <h1>Authentication Application</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
