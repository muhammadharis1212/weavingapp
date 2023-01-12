import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../api/auth/login";
import { AuthContext } from "../../context/AuthContext";
import { addUser } from "../../features/user/userSlice";
import "./login.css";

const Login = () => {
  const { setToken, setUser, setCompany } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const res = JSON.parse(await login(email, password));
      console.log(res);
      if (res?.data?.statusCode === 401) {
        console.log(res.data.message);
        setErrMsg(res?.data.message);
      }
      if (res?.user) {
        dispatch(addUser(res?.user));
        navigate("/");
        setUser(res.user);
        setCompany(res.company);
        setToken(res.access_token);
      }
    }
  };

  return (
    <div className="login--wrapper">
      <div className="login--container">
        <h1>Software Name</h1>
        <h3>Sign In</h3>
        {errMsg && <div className="error">{`${errMsg}`}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type={"email"}
            id="email"
            ref={userRef}
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type={"password"}
            id="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
