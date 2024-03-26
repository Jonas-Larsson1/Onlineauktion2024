import React, { useState } from 'react'
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
        <div className="dropdown align-self-center mt-2 w-100">
          <button className="btn btn-primary dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
            onClick={() => setDropdownOpen(prev => !prev)}>
            Category
          </button>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} w-100 d-flex flex-column`} aria-labelledby="dropdownMenuButton1">
          
          {dropdownOpen && ( <>
          <ul style={{listStyle:"none", padding:"0"}}>

            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
            <li><input type='text' placeholder='Custom category' className='w-100'/></li> 
          </ul>
          </>
          )}
          </div>
        </div>
      </div>

    </form>
  )
}

export default NewAuctionPage