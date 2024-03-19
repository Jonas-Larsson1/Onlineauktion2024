import { useEffect, useState } from "react"

export default function AuctionPage() {
  const [auction, setAuction] = useState(null)

  // useEffect(() => {
  //   fetch('api/auctions')
  //   .then((res) => res.json())
  //   .then(result => setAuction(result))

  //   //   if (!res.ok) {
  //   //     throw Error("Could not fetch data")
  //   //   } else {}
  //   // })
    
  // }, [])
  

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('api/auctions/1')
      const result = await response.json()

      setAuction(result)
    }

    getData()
  }, [])

  return <>
    <h1>Auction page yo</h1>
    {auction ? 
      <p>{auction.title}</p>
    : 
      <p>404: Auction not found</p>
    }
  </>
}
