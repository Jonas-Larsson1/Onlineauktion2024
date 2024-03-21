import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap'
import {FetchedDataContext} from './SearchResults';

const Categories = () => {
    const { data } = useContext(FetchedDataContext)
    const [toggle, setToggle] = useState(false)
    const [auctionData, setAuctionData] = useState([])

    const allCategories = []

    useEffect(() => {
        setAuctionData(data);
    }, [data]);
    
    const filteredCategories = auctionData ? auctionData.map((item) => (item.category.map(i => allCategories.includes(i) ? null : allCategories.push(i)))) : [];

  return (
    <>
    <div className="container d-flex flex-row justify-content-between border border-secondary rounded p-2">
       <h3 className='px-3'>categories</h3>
       <Button  type="button" className="btn btn-primary btn-block" onClick={() => {setToggle(!toggle), filteredCategories}}><i className="bi bi-filter"></i></Button>
    </div>
    <div className='p-2'>
       {toggle ? <div><div className='list-group'>{allCategories.map((cat, index) => <a key={index} className='list-group-item list-group-item-action' href="#" onClick={() => console.log("clicked")}>{cat}</a>)}</div></div> : null}
    </div>
        
    </>
  )
}

export default Categories