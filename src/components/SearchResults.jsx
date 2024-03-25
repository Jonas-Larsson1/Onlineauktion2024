import React, {useState, useEffect, useContext} from 'react'
import { SearchContext } from './SearchBar';

const FetchedDataContext = React.createContext(); // global state for fetched data

const SearchResults = ({category}) => {
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
                // console.log(data);
                setFetchedData(data)
                setData(data);
                
                
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    useEffect(() => {
        // console.log(fetchedData);
        // console.log(category)
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
            // console.log(category)
        }
    }, [fetchedData, searchQuery]);

    //let test = fetchedData.map((item) => item.map((i) => i.category == category ? <ul><li><h3>{i.title}</h3><p>{i.description}</p><p>{i.category}</p></li></ul> : null))

  return <>
    {category !== null ? 
        fetchedData.map((item, index) => item.category.includes(category) ? 
            <div className='d-flex flex-row flex-wrap justify-content-center' style={{width: "auto"}} >
                <div  key={index} className="card m-2" style={{width: "18rem"}}>
                    <img className="card-img-top" src={item.images[0]}/>
                    <div className="card-body">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>{item.category[1]}</p>
                    </div>
                </div> 
            </div>
        : console.log(item.category, category))
    : filteredData.length !== 0 ?
        <div className='d-flex flex-row flex-wrap justify-content-center' style={{width: "auto"}} >
            {filteredData.map((auction, index) => 
                <div key={index} className="card m-2" style={{width: "18rem"}}>
                    <img className="card-img-top" src={auction.images[0]} /> 
                    <div className="card-body">
                        <h3>{auction.title}</h3>
                        <p>{auction.description}</p>
                    </div>
                </div>
            )}
        </div>
        : <h1>Nothing found</h1>
    }</>
}

export default SearchResults;

export { FetchedDataContext };