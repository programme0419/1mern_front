import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Logout from "./components/Logout.jsx";
function App() {
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setauth(false);
        setauth1(true);
        return;
      }

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (res.status === 201 || res.status === 200) {
        setauth(true);
        setauth1(false);
      } else {
        setauth(false);
        setauth1(true);
        localStorage.removeItem("jwt"); // Clear invalid token
      }
    } catch (error) {
      console.log(error);
      setauth(false);
      setauth1(true);
      localStorage.removeItem("jwt"); // Clear token on error
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <>
      <Navbar auth={auth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected routes wrapper */}
        <Route>
          if (auth1)
          {
            <>
              <Route path="/login" element={<Login />} auth={auth1} />
              <Route path="/register" element={<Register />} auth={auth1} />
              <Route path="/dashboard" element={<Dashboard />} auth={auth} />
              <Route path="/logout" element={<Logout />} auth={auth1} />
            </>
          }{" "}
          else {<Route path="*" element={<Navigate to="/" replace />} />}
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
