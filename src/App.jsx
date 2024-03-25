import { GlobalProvider } from "./GlobalContext.jsx";
import Router from "./components/Router.jsx";
import './styles/index.css'

export default function App() {
  return <>
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  </>
}
