import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"

const CheckoutNavButton = () => {
  const [wonAuctionCount, setWonAuctionCount] = useState(null)
  let location = useLocation()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/wonAuctions')
      
      if (response.ok) {
        const result = await response.json()
        setWonAuctionCount(result.length)
      }
    }

    getData()

  }, [location])

  return <>
    <button className="navbar-btn ms-2 text-decoration-none text-secondary position-relative" >
    {wonAuctionCount > 0 ?
      <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">
        {wonAuctionCount}
      </Badge>
    : <></>}
      <Link to="/checkout">
        <img src="/src/assets/shoppingCart.png" alt="ShoppingCart" height="40px" />
      </Link>
    </button>
  </>
}

export default CheckoutNavButton