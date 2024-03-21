import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap'
import {FetchedDataContext} from './SearchResults';

const Categories = () => {
    const { data } = useContext(FetchedDataContext)
    const [toggle, setToggle] = useState(false)

  return (
    <>
    <div className="container d-flex flex-row justify-content-between border border-secondary rounded p-2">
       <h3 className='px-3'>categories</h3>
       <Button  type="button" className="btn btn-primary btn-block" onClick={() => setToggle(!toggle)}><i className="bi bi-filter"></i></Button>
       </div>
       <div>
       {toggle ? <div><button onClick={() => console.log(data)}>Click</button></div> : null}
        </div>
    </>
  )
}

export default Categories