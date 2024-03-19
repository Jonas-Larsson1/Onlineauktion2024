import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
      // <imageGallery />
      <div>
        <p>{auction.title}</p>
        <p>{auction.description}</p>
      </div>
    : 
      <p>404: Auction not found</p>
    }
  </>
}
