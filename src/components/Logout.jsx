import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 401) {
        window.alert("Please Logout later");
        navigate("/login");
      } else {
        window.alert("Logout Successfully");
        localStorage.removeItem("jwt");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    logout();
  }, []);
};

export default Logout;
