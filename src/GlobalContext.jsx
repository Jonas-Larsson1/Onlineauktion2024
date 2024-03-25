import { createContext, useState } from "react";

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