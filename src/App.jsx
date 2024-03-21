import { useContext } from "react";
import { GlobalContext, GlobalProvider } from "./GlobalContext.jsx";
import Router from "./components/Router.jsx";
import LoginPage from "./pages/LoginPage.jsx";


export default function App() {

  return  <>
  <GlobalProvider>
    <Router />
  </GlobalProvider>
  </> 
}
