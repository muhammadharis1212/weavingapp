import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { Button } from "@mui/material";

const Login = () => {
  const { login, loginError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    if (email && password) {
      // Send data to the backend via POST
      await login(email, password);
    }
  };

  return (
    <div className="login--wrapper">
      <div className="login--container">
        <h1>Software Name</h1>
        <h3>Sign In</h3>
        {loginError && <div className="error">{`${loginError}`}</div>}

        <input
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" onClick={handleClick} color="success">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
