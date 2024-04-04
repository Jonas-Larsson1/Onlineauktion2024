import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap'
import {FetchedDataContext} from './SearchResults';

const Categories = ({category, setCategory, setSearchQuery}) => {
  const { data } = useContext(FetchedDataContext)

  const [toggle, setToggle] = useState(false)
  const [auctionData, setAuctionData] = useState([])

  const allCategories = []

  useEffect(() => {
    setAuctionData(data);
  }, [data]);

  // added
  const handleCategoryClick = (category) => {
    setSearchQuery('')
    setCategory(category);
    setToggle(false);
  };
  
  const filteredCategories = auctionData ? 
    auctionData.map((item) => 
      item.category.map(i => 
        allCategories.includes(i) ? null : allCategories.push(i)
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
          {allCategories.map((cat, index) => 
            <a key={index} className='list-group-item list-group-item-action' href="#" onClick={() => handleCategoryClick(cat)}>{cat}</a>
          )}
        </div> 
      : null}
    </div>  
  </>
}

export default Categories;
// export { allCategories };