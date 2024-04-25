import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [isCreator, setIsCreator] = useState(false);


  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      const response = await fetch("/api/login");
      const result = await response.json()

      if (result.loggedIn != false) {
        setLoggedIn(result.loggedIn);
      } else {
        setLoggedIn(null);
      }

      setIsLoading(false);
    };

    getSession();
  }, []);

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
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.status == 201) {
      setLoggedIn(result.loggedIn);
    }

    return response;
  };

  const logout = async () => {
    await fetch("/api/login", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoggedIn(null);
   window.location.reload()
  };

  return (
    <GlobalContext.Provider
      value={{
        loggedIn,
        login,
        isLoading,
        logout,
        show,
        setShow,
        hideAlert,
        displayAlert,
        showLogoutAlert,
        setShowLogoutAlert,
         socket,
         setSocket,
         isCreator,
         setIsCreator
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
