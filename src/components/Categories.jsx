import React from 'react'
import { Button } from 'react-bootstrap'

const Categories = () => {

    

  return (
    <div className="container d-flex flex-row justify-content-between border border-secondary rounded p-2">
       <h3 className='px-3'>categories</h3>
       <Button  type="button" className="btn btn-primary btn-block"><i className="bi bi-filter"></i></Button>
    </div>
  )
}

export default Categories