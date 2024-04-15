import React, { useState, useEffect, useContext } from 'react'
import { SearchContext } from './SearchBar';
import ListCard from './ListItem';
import StyleCard from './StyleCard';

const FetchedDataContext = React.createContext(); // global state for fetched data

const SearchResults = ({ category }) => {
  const { searchQuery } = useContext(SearchContext)
  const { setData } = useContext(FetchedDataContext)

  const [fetchedData, setFetchedData] = useState(null)
  const [filteredData, setFilteredData] = useState(fetchedData);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/auctions')
      const result = await response.json()
      setFetchedData(result)
      setData(result)
    }
    getData()

  }, [])

  // filter fetchedData based on search query
  useEffect(() => {
    if (fetchedData) {
      const filteredAuctions = fetchedData.filter(item => {
        return (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
      setFilteredData(filteredAuctions); // holds results of filtering 
    }
  }, [fetchedData, searchQuery, category])

  return (<>
    {searchQuery ? <p className='align-self-start mx-4'>You are searching for: <b>{searchQuery}</b> </p> : null}
    <div style={{border:"2px solid red", width:"90%"}} className='d-flex flex-row flex-wrap justify-content-between'>
    {filteredData ? filteredData.map((item, index) => (
      category === null || item.category.includes(category) ?
        <div key={index} className='d-flex flex-row flex-wrap m-2' style={{border: "2px solid pink"}}>
          {/* <div className="card m-2" style={{ width: "18rem" }}>
            <a href={`/AuctionPage/${item.id}`}>
              <img className="card-img-top" src={item.images[0]} />
            </a>
            <div className="card-body">
              <a href={`/AuctionPage/${item.id}`}>
                <h3>{item.title}</h3>
              </a>
              <p>{item.description}</p>
              <p>{item.category[1]}</p>
            </div> */}
          {/* </div> */}
            <StyleCard>
          <ListCard item={item}/>
          </StyleCard>
        </div>
      : null))
    : null}</div>
  </>)
}

export default SearchResults;

export { FetchedDataContext };