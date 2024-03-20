import { GlobalProvider } from "./GlobalContext.jsx";
import Router from "./components/Router.jsx";

export default function App() {
  return <>
  <GlobalProvider>
    <Router />
  </GlobalProvider>
  </>
}