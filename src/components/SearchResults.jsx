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

    }, [fetchedData, searchQuery])

    useEffect(() => {
        const filteredAuctions = fetchedData.auctions.filter(item => {
            return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredData(filteredAuctions);
        console.log(filteredData.length)
    }, [fetchedData, searchQuery]);


  return (
    <>
        <div>Results</div>
        <div>{searchQuery}</div>
        {filteredData.length !== 0 ?
        (<ul>
                {filteredData.map(auction => (
                    <li key={auction.id}>
                        <h3>{auction.title}</h3>
                        <p>{auction.description}</p>
                    </li>
                ))}
            
        </ul>)
        : <p>Nothing found</p>
        }
    </>
  )
}

export default SearchResults