import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({children}){


    const[user, setUser] = useState(null)

    useEffect(() => {
        fetch('api/users')
        .then ((res) => res.json()) 
        .then ((res) => setUser(res)) 
    }, [])

   

    return <GlobalContext.Provider value = {{
    user, 
    setUser
    }}>
        {children}


    </GlobalContext.Provider>

}

export {GlobalContext, GlobalProvider}