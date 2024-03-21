import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext()

function GlobalProvider({children}){

   
   

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
     logout
    }}>
        {children}


    </GlobalContext.Provider>

}

export {GlobalContext, GlobalProvider}