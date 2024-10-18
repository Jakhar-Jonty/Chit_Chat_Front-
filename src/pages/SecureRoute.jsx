// import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SecureRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
    // if (token) {
    //   // Check if token is expired
    //   const CheckTokenHandler = async () => {
    //     axios
    //       .get("https://localhost:4000/protected-route", {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((response) => {
    //         console.log(response.data);
    //       })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //       });
    //   };
    //   CheckTokenHandler();
    // }
  }, [navigate]);

  // If there is no token, return null to avoid rendering the children

  // If the token is present, render the children
  return <>{children}</>;
};
