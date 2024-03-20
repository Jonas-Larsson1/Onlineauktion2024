import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({children}){

   

    

   

    return <GlobalContext.Provider value = {{

    }}>
        {children}


    </GlobalContext.Provider>

}

export {GlobalContext, GlobalProvider}