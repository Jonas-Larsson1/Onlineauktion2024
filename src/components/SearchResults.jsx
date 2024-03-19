import React, {useState, useEffect, useContext} from 'react'
import { SearchContext } from './SearchBar';

const SearchResults = () => {
    const {searchQuery } = useContext(SearchContext)
    const [fetchedData, setFetchedData] = useState({ auctions: [], users: [] })
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('../db.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Response failed')
                }
                return response.json();
            })
            .then (data => {
                setFetchedData(data)
                
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    useEffect(() => {
        // console.log(fetchedData);
        // console.log(searchQuery)

    }, [fetchedData, searchQuery]) // remove when everything starts working

    useEffect(() => {
        const filteredAuctions = fetchedData.auctions.filter(item => {
            return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
        }); // checks if searchQuery exists in title or description
        setFilteredData(filteredAuctions);
        // console.log(filteredData.length)
    }, [fetchedData, searchQuery]);


  return (
    <>
        <div>Results</div>
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

export default SearchResults