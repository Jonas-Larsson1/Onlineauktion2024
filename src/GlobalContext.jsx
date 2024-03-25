import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext()

function GlobalProvider({children}){

   
    const [show, setShow] = useState(() => {
        return sessionStorage.getItem('showAlert' === 'true' || 'false')
    }) 

    useEffect(() => {
        return sessionStorage.setItem('showAlert', show)
    }, [show])

    const hideAlert = () => {
        setShow(false)
    }

    const displayAlert = () => {
        setShow(true)
    }
    const [loggedIn, setLoggedIn] = useState(() => {
        return sessionStorage.getItem('loggedIn') === 'true' || false 
    }) // Put loggedIn item in session storage with the value true or false

    useEffect(() => {
        sessionStorage.setItem('loggedIn', loggedIn)
    }, [loggedIn]) // Update loggedIn item everytime loggedIn state changes

    const login = () => {
        setLoggedIn(true)
    }

    const logout = () => {
        setLoggedIn(false)
    }

    return <GlobalContext.Provider value = {{
     loggedIn,
     login,
     logout,
     show,
     setShow,
     hideAlert,
     displayAlert
    }}>
        {children}


    </GlobalContext.Provider>

}

export {GlobalContext, GlobalProvider}import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

  const [auction, setAuction] = useState(null)

  return ( 
    <GlobalContext.Provider 
      value={{
        auction, 
        setAuction,
      }}>
      {children}
    </GlobalContext.Provider>
   );
}
 
export {GlobalContext, GlobalProvider}