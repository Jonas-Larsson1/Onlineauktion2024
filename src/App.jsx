import React, {useState} from 'react';
import Router from "./components/Router.jsx";
import SearchBar, {SearchContext} from "./components/SearchBar.jsx";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
  <>
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="d-flex flex-column justify-content-center ">
        {/* <Router /> */}
        <SearchBar />
      </div>
    </SearchContext.Provider>
  </>)
}