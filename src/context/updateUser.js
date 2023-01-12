export const updateUser = async (bearer_token, userObject) => {
  await fetch("http://localhost:5000/user/update", {
    // Enter your IP address here
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + bearer_token,
    },
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({ userObject }), // body data type must match "Content-Type" header
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("User Updated : ", data);
    });
};
