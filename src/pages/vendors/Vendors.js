import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Vendors = () => {
  const { user, token } = useContext(AuthContext);
  const [vendors, setVendors] = useState({});
  useEffect(() => {
    //fetch user details
    const userDetail = async (bearer_token) => {
      await fetch("http://localhost:5000/vendors", {
        // Enter your IP address here
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearer_token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          return setVendors(data);
        });
    };
    userDetail(token);
    console.log("Finished useEffect in Vendors");
  }, [token, user]);
  return <div>Vendors</div>;
};

export default Vendors;
