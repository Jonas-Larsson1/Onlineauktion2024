import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({children}){

    const [auction, setAuction] = useState(null)
   
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
        return sessionStorage.getItem('loggedIn')
    }) // Put loggedIn item in session storage with the value true or false

    useEffect(() => {
        sessionStorage.setItem('loggedIn', loggedIn)
    }, [loggedIn]) // Update loggedIn item everytime loggedIn state changes

    const login = (userId) => {
        setLoggedIn(userId)
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
     displayAlert,
     auction, 
     setAuction,
    }}>
        {children}


    </GlobalContext.Provider>

}

export {GlobalContext, GlobalProvider}
