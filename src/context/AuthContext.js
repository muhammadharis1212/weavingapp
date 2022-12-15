import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(null);

  function getToken() {
    const token = sessionStorage.getItem("token");
    if (token) return token;
    return "";
  }
  getToken();

  //login function to get token
  const login = async (email, password) => {
    const URL = "http://localhost:5000/login";
    await fetch(URL, {
      // Enter your IP address here
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    })
      .then((res) => {
        if (!res.ok) {
          setLoginError("Invalid email or password");
          throw new Error("Invalid email or password");
        }
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem("token", JSON.stringify(data.access_token));
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.access_token);
        setUser(data.user);
        setLoginError(null);
        //redirect to home page
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoginError(err);
      });
  };

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("login");
  }
  function getToken() {
    const token = sessionStorage.getItem("token");
    return token;
  }
  function getUser() {
    const user = sessionStorage.getItem("user");
    if (user) return JSON.parse(user);
    return user;
  }

  //   const value = useMemo(
  //     () => ({
  //       token,
  //       user,
  //       isAuthenticated,
  //       login,
  //       logout,
  //     }),
  //     [token]
  //   );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, loginError, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
