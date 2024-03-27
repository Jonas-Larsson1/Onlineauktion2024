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
        if (sessionStorage.getItem('loggedIn') === "false" || sessionStorage.getItem('loggedIn') === false || sessionStorage.getItem('loggedIn') === "null" || sessionStorage.getItem('loggedIn') === null) {
            return false
        } else {
            return sessionStorage.getItem('loggedIn')
        }
    }) 

    useEffect(() => {
        sessionStorage.setItem('loggedIn', loggedIn)
    }, [loggedIn]) 

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
