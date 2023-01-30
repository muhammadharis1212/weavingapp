import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getAuthToken());
  const [authUser, setAuthUser] = useState(getAuthUser());
  const [authCompany, setAuthCompany] = useState(getAuthCompany());

  function getAuthToken() {
    const authToken = sessionStorage.getItem("authToken");
    return authToken;
  }
  function getAuthUser() {
    const authUser = sessionStorage.getItem("authUser");
    if (authUser) return JSON.parse(authUser);
    return authUser;
  }
  function getAuthCompany() {
    const authCompany = sessionStorage.getItem("authCompany");
    if (authCompany) return JSON.parse(authCompany);
    return authCompany;
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        authUser,
        authCompany,
        setAuthToken,
        setAuthUser,
        setAuthCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
