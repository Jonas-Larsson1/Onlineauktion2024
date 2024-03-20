import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({children}){

    

    const[user, setUser] = useState(null)
    const[usernameInput, setUsernameInput] = useState('')
    const[passwordInput, setPasswordInput] = useState('')
    

    useEffect(() => {
        fetch('api/users')
        .then ((res) => res.json()) 
        .then ((res) => setUser(res)) 
    }, [])

    return <GlobalContext.Provider value = {{
        user,
        setUser,
        usernameInput,
        setUsernameInput,
        passwordInput,
        setPasswordInput
    }}>
        {children}


    </GlobalContext.Provider>

}

export {GlobalContext, GlobalProvider}