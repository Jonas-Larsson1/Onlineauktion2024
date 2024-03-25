import React, {useState, useEffect, useContext} from 'react'
import { SearchContext } from './SearchBar';

const FetchedDataContext = React.createContext(); // global state for fetched data

const SearchResults = ({category}) => {
    const {searchQuery } = useContext(SearchContext)
    const [fetchedData, setFetchedData] = useState(null)
    const [filteredData, setFilteredData] = useState(fetchedData);
    const { setData } = useContext(FetchedDataContext)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('/api/auctions')
            const result = await response.json()
            setFetchedData(result)
            setData(result)
            // fetch('api/auctions/')
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error('Response failed')
            //     }
            //     return response.json();
            // })
            // .then (data => {
            //     // console.log(data);
            //     setFetchedData(data)
            //     setData(data);
                
                
            // })
            // .catch(error => {
            //     console.error('Error:', error)
            // })
        }
        getData()
 
    }, [])

    useEffect(() => {
        if (fetchedData) {
            const filteredAuctions = fetchedData.filter(item => {
                return (
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.category.includes(category)
                    );
                });
            setFilteredData(filteredAuctions);
        }   
    }, [fetchedData, searchQuery, category])
    
  return (<>
    {searchQuery ? <p>You are searching for: <b>{searchQuery}</b> </p> : null}
    {filteredData ? filteredData.map((item, index) => (
        category === null || item.category.includes(category) ?
                <div key={index} className='d-flex flex-row flex-wrap justify-content-center' style={{width: "auto"}} >
                    <div className="card m-2" style={{width: "18rem"}}>
                        <a href={`/AuctionPage/${item.id}`}>
                            <img className="card-img-top" src={item.images[0]}/>
                        </a>
                        <div className="card-body">
                            <a href={`/AuctionPage/${item.id}`}>
                                <h3>{item.title}</h3>
                            </a>  
                            <p>{item.description}</p>
                            <p>{item.category[1]}</p>
                        </div>
                    </div> 
                </div>
        : null))
    : null
    }</>)
}

export default SearchResults;

export { FetchedDataContext };