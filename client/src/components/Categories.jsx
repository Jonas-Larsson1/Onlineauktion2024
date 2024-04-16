import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap'
import {FetchedDataContext} from './SearchResults';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Categories = ({category, setCategory, setSearchQuery}) => {
  const { data } = useContext(FetchedDataContext) // global data

  const [toggle, setToggle] = useState(false) // toggle for category filter
  const [auctionData, setAuctionData] = useState([]) // holds auction data

  const allCategories = [] // will hold existing categories after mapping

  useEffect(() => {
    setAuctionData(data); // updating auctionData with fetched data
  }, [data]);

  const handleCategoryClick = (category) => {
    setSearchQuery('') // resets search query
    setCategory(category);
    setToggle(false); // closes menu with categories
    
  };
  
  const filteredCategories = auctionData ? 
    auctionData.map((item) => 
      item.category.map(i => 
        allCategories.includes(i) ? null : allCategories.push(i) // checks if category of item exists in allCategories, if not - category will be appended, if yes - cat will be skipped
      )
    ) 
  : [];

  return <>
    <div className="container d-flex flex-row justify-content-between border border-secondary rounded p-2 ">
      {category ? <h3 className='px-3'>{category}</h3> 
        : <h3 className='px-3'>Select category</h3>}
      <Button type="button" className="btn btn-primary btn-block" onClick={() => {setToggle(!toggle), filteredCategories}}>
        <i className="bi bi-filter"></i>
      </Button>
    </div>
    <div className='p-2'>
      {toggle ? 
        <div className='list-group'>
          <a className='list-group-item list-group-item-action' href="#" onClick={() => handleCategoryClick(null)}>
            <b>Show all</b>
          </a>
          {/* renders each category */}
          {allCategories.map((cat, index) => 
            <a key={index} className='list-group-item list-group-item-action' href="#" onClick={() => handleCategoryClick(cat)}>{cat}</a>
          )}
        </div> 
      : null}
    </div>  
  </>
}

export default Categories;
