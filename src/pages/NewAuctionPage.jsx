import React, { useState, useEffect, useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const NewAuctionPage = () => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [data, setData] = useState(null)
  const [mainTitle, setMainTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageInput, setImageInput] = useState([''])
  const [startPrice, setStartPrice] = useState('')
  const [reservedPrice, setReservedPrice] = useState('')

  const [warning, setWarning] = useState('')
  const {loggedIn} = useContext(GlobalContext)

  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/auctions')
      const result = await response.json()
      setData(result)

    }
    getData()

  }, [])

  async function postNewAuction(e){
    e.preventDefault()
    
    if(imageInput[0].length >= 1 && mainTitle.length > 2 && description.length > 3 && startDate != null && 
      endDate != null && startPrice.length > 0 && reservedPrice.length > 0 && title[0].length >= 1){

        const res = await fetch("/api/auctions", {
          
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sellerId : loggedIn,
        images: [imageInput],
        title: mainTitle,
        description: description,
        startDate: startDate,
        endDate: endDate,
        startingPrice: startPrice,
        reservePrice: reservedPrice,
        category: [title],
        bidHistory : [{}]
      })
    })
    if(res.ok){
      console.log(res)
      navigate("/")
    }else{
      console.log("något fick fel")
    }
  } else if(imageInput[0].length < 1){
    setWarning("You need atleast one image")
   
  }
   else if(imageInput[0].length < 1){
    setWarning("You need atleast one image")
  } else if(mainTitle.length < 2){
    setWarning("You atleast two characters as title")
   
  
  } else if(description.length < 1){
    setWarning("You need atleast three characters in description")
   
  
  } else if(startDate === null ){
    setWarning("You need to put start date of auction")
   
  
  } else if(endDate === null ){
    setWarning("You need to put start date of auction")

  } else if(startPrice.length < 1 ){
    setWarning("You need to put a starting price")
  }else if(reservedPrice.length < 1 ){
    setWarning("You need to put a reserved price")
  }else{
    setWarning("You need to choose a category")
  }
  }

  const existingCategories = []

  let filtered = data ? data.map((item) => 
    item.category.map(i => 
      existingCategories.includes(i) ? null 
      : existingCategories.push(i)
    )
  ) : null

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setTitle(customCategory);
      setDropdownOpen(false);
      setCustomCategory('');
    }
  };

  return <>
    
   <Alert className='' severity="info">
  {warning}
</Alert>
    <form className='w-100 d-flex justify-content-center align-items-center m-3'>
      <div className='d-flex flex-column' style={{width:"30%"}}>
        <div className='d-flex flex-column'>
         
          <input             
            type="text"
            value={imageInput} 
            onChange={(e) => {setImageInput(e.target.value)}} 
            className="form-control mb-2"
            placeholder="Link to your image"
            aria-label="Link to your image" />

          <input
            type="text"
            value={mainTitle} 
            onChange={(e) => {setMainTitle(e.target.value)}} 
            className="form-control mb-2"
            placeholder="Title"
            aria-label="Title" />

          <input
            type="text"
            value={description} 
            onChange={(e) => {setDescription(e.target.value)}} 
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
                value={startPrice} 
                onChange={(e) => {setStartPrice(e.target.value)}} 
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
                value={reservedPrice} 
                onChange={(e) => {setReservedPrice(e.target.value)}} 
                className="form-control"
                placeholder="Reserved Price"
                aria-label="Reserved Price" />

            </div>
          </div>
        </div>
        <div className="dropdown mt-2 w-100 d-flex justify-content-center">
          <button 
            className="btn btn-secondary dropdown-toggle w-75" 
            type="button" 
            id="dropdownMenuButton1" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            onClick={() => { setDropdownOpen(prev => !prev), filtered }}>

              {title == '' ? 'Categories' : title}

          </button>
        </div>
        {dropdownOpen ? <div className='list-group w-75 align-self-center'>
          {existingCategories.map((cat, index) => 
            <a key={index} className='list-group-item list-group-item-action text-center' href="#" onClick={() => {
              setDropdownOpen(false), setTitle(cat)}}>{cat}</a>
          )}
          
          <input 
            type='text' 
            placeholder='Add custom category' 
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)} 
            onKeyDown={handleKeyPress}/>

          </div> 
        : null}

        <button className="btn btn-primary mt-3 w-75 align-self-center" onClick={postNewAuction}>
          Submit
        </button>
      </div>
    </form>
                </>
  
}

export default NewAuctionPage