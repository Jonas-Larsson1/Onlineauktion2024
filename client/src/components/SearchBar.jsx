import React, {useState, useContext} from 'react';

const SearchContext = React.createContext();

const SearchBar = ({setCategory}) => {
  const [searchValue, setSearchValue] = useState(''); // holds input
  const {setSearchQuery } = useContext(SearchContext); // accessing setSearchQuery  from SearchContext

  const handleChange = (event) => {
      setSearchValue(event.target.value) // gets input
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      setSearchQuery(searchValue) // saves input to searchQuery
      setSearchValue('') // cleans up input
      setCategory(null) // reset category
  }

  return (
    <form className="d-flex w-75 align-self-center" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={searchValue} 
        onChange={handleChange} 
        className="form-control mb-2" 
        placeholder="&#128269; Search" 
        aria-label="Search" 
      />
    </form>
  )
}

export default SearchBar;
export { SearchContext };