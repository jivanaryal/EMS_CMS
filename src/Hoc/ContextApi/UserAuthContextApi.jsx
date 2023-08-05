import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();

const UserAuthContextApi = ({ children, login, setLogin, loginData }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  console.log(login, loginData);

  useEffect(() => {
    const storedToken = localStorage.getItem("token1");

    if (storedToken) {
      setToken(storedToken || loginData);
    }

    if (storedToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []); // empty dependency array to run effect only once on mount

  return (
    <UserAuthContext.Provider
      value={{
        name: "jivan",
        tkn: token || "", // provide a default value when localStorage is not available
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextApi;
