import { createContext, useEffect, useState } from "react";
import { redirect } from "react-router";

const GlobalContext = createContext();

function GlobalProvider({children}){

  const[showLogoutAlert, setShowLogoutAlert] = useState(null)
  const[loggedIn, setLoggedIn] = useState(false)
   
  const [show, setShow] = useState(() => {
    return sessionStorage.getItem("showAlert" === "true" || "false");
  });

  useEffect(() => {
    return sessionStorage.setItem("showAlert", show);
  }, [show]);

  const hideAlert = () => {
    setShow(false);
  };

  const displayAlert = () => {
    setShow(true);
  };

  const login = (userId) => {
    setLoggedIn(userId);
  };

  const logout = async () => {

    await fetch('/api/login', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setLoggedIn(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        loggedIn,
        login,
        logout,
        show,
        setShow,
        hideAlert,
        displayAlert,
      showLogoutAlert,
      setShowLogoutAlert
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
