import React, {useState} from 'react';
import Router from "./components/Router.jsx";
import SearchBar, {SearchContext} from "./components/SearchBar.jsx";
import SearchResults from './components/SearchResults.jsx';
import Categories from './components/Categories.jsx';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
  <>
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className='d-flex flex-row-reverse'>
      <div className="d-flex flex-column justify-content-space-between w-75 p-2 col-md-auto">
        {/* <Router /> */}
        <SearchBar />
        <SearchResults/>
      </div>
      <div className='col-md-auto p-2'>
      <Categories />
      </div>
      </div>
    </SearchContext.Provider>
  </>)
}