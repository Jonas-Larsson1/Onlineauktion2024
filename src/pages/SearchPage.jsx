import { useState } from 'react';

import SearchBar, {SearchContext} from "../components/SearchBar.jsx";
import SearchResults, {FetchedDataContext} from '../components/SearchResults.jsx';
import Categories from '../components/Categories.jsx';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null) // result of fetch
  const [category, setCategory] = useState(null);
 
  return (
    <>
    <FetchedDataContext.Provider value={{data, setData}}>
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <div className='d-flex flex-row-reverse w-100 justify-content-between'>
        <div className="d-flex flex-column p-2 w-75">
          {/* <Router /> */}
          <SearchBar setCategory={setCategory}/>
          <SearchResults category={category}/>
        </div>
        <div className='col-lg-4 p-2'>
        <Categories setCategory={setCategory}/>
        </div>
        </div>
      </SearchContext.Provider>
      </FetchedDataContext.Provider>
    </>)
}

export default SearchPage