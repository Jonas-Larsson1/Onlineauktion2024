import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({children}){

   

    const [loggedIn, setLoggedIn] = useState(false)



    return <GlobalContext.Provider value = {{
     loggedIn,
     setLoggedIn
    }}>
        {children}


    </GlobalContext.Provider>

}

export {GlobalContext, GlobalProvider}