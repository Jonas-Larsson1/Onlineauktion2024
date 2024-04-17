
import { useContext, useEffect, useState } from "react";
import { GlobalContext, GlobalProvider } from "./GlobalContext.jsx";
import Router from "./components/Router.jsx";
import { io } from "socket.io-client"


import './styles/index.css'

export default function App() {

  return <>
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  </>
}
