import { createContext, useEffect, useState } from "react";
import { redirect } from "react-router";

const GlobalContext = createContext();

function GlobalProvider({children}){

  const[showLogoutAlert, setShowLogoutAlert] = useState(null)
  const[loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const getSession = async () => {
      const response = await fetch('/api/login')
      const result = await response.json()
  
      setLoggedIn(result.loggedIn)
    }

    getSession()
  }, [])
   
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

  const login = async (userData) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const result = await response.json()

    if (response.status == 201) {
      setLoggedIn(result.loggedIn);
    } else {
      return response.message
    }
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
