import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  console.log(token);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    //fetch user details
    const userDetail = async (id, bearer_token) => {
      await fetch("http://localhost:5000/user", {
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
          return setUserInfo({
            name: data.name,
            email: data.email,
            phone: data.phone,
            companyName: data.companyName,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            state: data.state,
            city: data.city,
            postal: data.postal,
          });
        });
    };
    userDetail(user.id, token);
    console.log("Finished useEffect in Profile.js");
  }, [token, user]);

  return (
    <div className="profile--container">
      <label>Name</label>
      <span>{userInfo.name}</span>
      <br />
      <label>Email</label>
      <span>{userInfo.email}</span>
      <br />
      <label>Phone</label>
      <span>{userInfo.phone}</span>
      <br />
      <label>Company</label>
      <span>{userInfo.companyName}</span>
      <br />
      <label>Address Line 1</label>
      <span>{userInfo.addressLine1}</span>
      <br />
      <label>Address Line 2</label>
      <span>{userInfo.addressLine2}</span>
      <br />
      <label>State</label>
      <span>{userInfo.state}</span>
      <br />
      <label>City</label>
      <span>{userInfo.city}</span>
      <br />
      <label>Postal</label>
      <span>{userInfo.postal}</span>
      <br />
    </div>
  );
};

export default Profile;
