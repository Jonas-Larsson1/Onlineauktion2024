import React, { useState, useEffect, useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const NewAuctionPage = () => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  
  // const toggleDropdown = () => {
  //   console.log("Button clicked!");
  //   setDropdownOpen(prev => !prev);
  //   console.log("Dropdown state:", dropdownOpen);
  // };

  return (
    <form className='w-100 d-flex justify-content-center align-items-center m-3'>
      <div className='w-50 d-flex flex-column'>
        <div className='d-flex flex-column'>
          <input
            type="text"
            // value={searchValue} 
            // onChange={handleChange} 
            className="form-control mb-2"
            placeholder="Title"
            aria-label="Title" />
          <input
            type="text"
            // value={searchValue} 
            // onChange={handleChange} 
            className="form-control mb-2"
            placeholder="Description"
            aria-label="Description" />
        </div>
        <div className='row'>
          <div className="col">
            <div className='d-flex flex-column'>
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                // startDate={startDate}
                // endDate={endDate}
                minDate={new Date()}
                maxDate={endDate}
                className="form-control custom-date-picker "
              />
            </div>
          </div>
          <div className="col">
            <div className='d-flex flex-column'>
              <label>End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                // startDate={startDate}
                // endDate={endDate}
                minDate={startDate}
                disabled={!startDate}
                className="form-control custom-date-picker "
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col">
            <div className='input-group mt-2'>
              <span className="input-group-text" >€</span>
              <input
                type="text"
                // value={searchValue} 
                // onChange={handleChange} 
                className="form-control"
                placeholder="Start Price"
                aria-label="Start Price" />
            </div>
          </div>
          <div className="col">
            <div className='input-group mt-2'>
              <span className="input-group-text" >€</span>
              <input
                type="text"
                // value={searchValue} 
                // onChange={handleChange} 
                className="form-control"
                placeholder="Reserved Price"
                aria-label="Reserved Price" />
            </div>
          </div>
        </div>
        <div className="container d-flex flex-row justify-content-between border border-secondary rounded p-2 ">
       {/* {category ? <h3 className='px-3'>{category}</h3> : <h3 className='px-3'>Select category</h3>} */}
       <button  type="button" className="btn btn-primary btn-block" onClick={() => setDropdownOpen(prev => !prev)}><i className="bi bi-filter"></i></button>
    </div>
    {dropdownOpen ? <button onClick={() => console.log(defaultData)}>Click</button> : null}
            </div>
    </form>
  )
}

export default NewAuctionPage