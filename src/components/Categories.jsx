import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap'
import {FetchedDataContext} from './SearchResults';

const Categories = ({setCategory}) => {
  const { data } = useContext(FetchedDataContext)
  const [toggle, setToggle] = useState(false)
  const [auctionData, setAuctionData] = useState([])

  const allCategories = []

  useEffect(() => {
    setAuctionData(data);
  }, [data]);

  // added
  const handleCategoryClick = (category) => {
    setCategory(category);
    setToggle(false);
    // console.log(category)
  };
  
  const filteredCategories = auctionData ? 
    auctionData.map((item) => 
      item.category.map(i => 
        allCategories.includes(i) ? null : allCategories.push(i)
      )
    ) 
    : [];

  return <>
    <div className="container d-flex flex-row justify-content-between border border-secondary rounded p-2">
       <h3 className='px-3'>Categories</h3>
       <Button  type="button" className="btn btn-primary btn-block" onClick={() => {setToggle(!toggle), filteredCategories}}><i className="bi bi-filter"></i></Button>
    </div>
    <div className='p-2'>
      {toggle ? 
        <div className='list-group'>
          <a className='list-group-item list-group-item-action' href="#" onClick={() => handleCategoryClick(null)}><b>Show all</b></a>
          {allCategories.map((cat, index) => 
            <a key={index} className='list-group-item list-group-item-action' href="#" onClick={() => handleCategoryClick(cat)}>{cat}</a>
          )}
        </div> 
      : null}
    </div>  
  </>
}

export default Categories