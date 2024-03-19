import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "react-bootstrap"

import ImageGallery from "../components/ImageGallery"

export default function AuctionPage() {
  let { id } = useParams()
  const [auction, setAuction] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/auctions/${id}`)
      const result = await response.json()
      setAuction(result)
    }

    getData()
  }, [])

  return <>
    <h1>Auction page yo</h1>
    {auction ? 
      <div>
        <ImageGallery auction={auction} />
        <p>{auction.title}</p>
        <p>{auction.description}</p>
      </div>
    : 
      <p>404: Auction not found</p>
    }

    <Button variant="success">Place offer</Button>{' '}
  </>
}
