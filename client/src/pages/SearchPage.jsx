import { useState, useEffect } from 'react';

import SearchBar, {SearchContext} from "../components/SearchBar.jsx";
import SearchResults, {FetchedDataContext} from '../components/SearchResults.jsx';
import Categories from '../components/Categories.jsx';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'; 


const SearchPage = () => {
  const navigate = useNavigate();
  const {incomingSearchQuery} = useParams() // search query from URL
  

  const [searchQuery, setSearchQuery] = useState(incomingSearchQuery); // input in search bar
  const [data, setData] = useState(null) // result of fetch
  const [category, setCategory] = useState(null);
 
  useEffect(() => {
    setSearchQuery(incomingSearchQuery);
  }, [incomingSearchQuery]);

  // useEffect(() => {
  //   navigate(`/SearchPage/${searchQuery}`);
  // }, [searchQuery, navigate]);

  return <>
  {/* access to fetched data */}
    <FetchedDataContext.Provider value={{data, setData}}> 
    {/* access to seqrch query from search bar */}
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <div className='d-flex flex-row-reverse justify-content-between'>
          <div className="d-flex flex-column p-2" style={{width:"70%"}}>
            <SearchBar setCategory={setCategory}/>
            <div className='d-flex flex-column align-items-center'>
            <SearchResults category={category}/>
            </div>
          </div>
          <div className='col-lg-3 p-2'>
            <Categories category={category} setCategory={setCategory} setSearchQuery={setSearchQuery}/>
          </div>
        </div>
      </SearchContext.Provider>
    </FetchedDataContext.Provider>
  </>
}

export default SearchPage