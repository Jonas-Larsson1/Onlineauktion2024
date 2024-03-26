import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewAuctionPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  return (
    <form className='w-100 d-flex justify-content-center align-items-center m-3'>
      <div className='w-50'>
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
              startDate={startDate}
              // endDate={endDate}
              minDate={new Date()} 
              className="form-control custom-date-picker "
            />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewAuctionPage