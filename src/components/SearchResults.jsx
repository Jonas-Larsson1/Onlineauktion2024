import React, {useState, useEffect, useContext} from 'react'
import { SearchContext } from './SearchBar';

const FetchedDataContext = React.createContext(); // global state for fetched data

const SearchResults = () => {
    const {searchQuery } = useContext(SearchContext)
    const [fetchedData, setFetchedData] = useState(null)
    const [filteredData, setFilteredData] = useState([]);
    const { setData } = useContext(FetchedDataContext)

    useEffect(() => {
        fetch('api/auctions/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Response failed')
                }
                return response.json();
            })
            .then (data => {
                console.log(data);
                setFetchedData(data)
                setData(data);
                
                
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    useEffect(() => {
        console.log(fetchedData);
        // console.log(searchQuery)

    }, [fetchedData]) // remove when everything starts working

    
    useEffect(() => {
        if (fetchedData) {
            const filteredAuctions = fetchedData.filter(item => {
                return (
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredData(filteredAuctions);
        }
    }, [fetchedData, searchQuery]);

  return (
    <>
        <div>{searchQuery}</div>
        {filteredData.length !== 0 ?
        (<ul>
                {filteredData.map(auction => (
                    <li key={auction.id}>
                        {/* <img src={auction.images[0]} /> */}
                        <h3>{auction.title}</h3>
                        <p>{auction.description}</p>
                    </li>
                ))}
            
        </ul>)
        : <h1>Nothing found</h1>
        }
    </>
  )
}

export default SearchResults;

export { FetchedDataContext };