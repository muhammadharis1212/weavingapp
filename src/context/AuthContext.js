import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [company, setCompany] = useState(getCompany());

  function getToken() {
    const token = sessionStorage.getItem("token");
    return token;
  }
  function getUser() {
    const user = sessionStorage.getItem("user");
    if (user) return JSON.parse(user);
    return user;
  }
  function getCompany() {
    const company = sessionStorage.getItem("company");
    if (company) return JSON.parse(company);
    return company;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        company,
        setToken,
        setUser,
        setCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
