import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({children}){

   

    const [loggedIn, setLoggedIn] = useState(() => {
        return sessionStorage.getItem('loggedIn') === 'true' || false 
    })

    useEffect(() => {
        sessionStorage.setItem('loggedIn', loggedIn)
    }, [loggedIn])

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