import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({children}){
   
  const [show, setShow] = useState(() => {
      return sessionStorage.getItem('showAlert' === 'true' || 'false')
  }) 

  useEffect(() => {
    return sessionStorage.setItem("showAlert", show);
  }, [show]);

  const hideAlert = () => {
    setShow(false);
  };

  const displayAlert = () => {
    setShow(true);
  };

  const [loggedIn, setLoggedIn] = useState(() => {
    if (
      sessionStorage.getItem("loggedIn") === "false" ||
      sessionStorage.getItem("loggedIn") === false ||
      sessionStorage.getItem("loggedIn") === "null" ||
      sessionStorage.getItem("loggedIn") === null
    ) {
      return false; // returns false if logged in becomes false or null
    } else {
      return sessionStorage.getItem("loggedIn"); // otherwise the value wont change
    }
  });

  useEffect(() => {
    sessionStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]); // updates sessionstorage if loggedIn changes

  const login = (userId) => {
    setLoggedIn(userId);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return <GlobalContext.Provider value = {{
      loggedIn,
      login,
      logout,
      show,
      setShow,
      hideAlert,
      displayAlert,
    }}>
    {children}
  </GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider };
