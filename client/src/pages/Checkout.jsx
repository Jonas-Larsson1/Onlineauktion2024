import { useEffect, useState } from "react"
import StyleCard from "../components/StyleCard";
import WonItem from "../components/WonItem";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function Checkout () {
  const [searchParams] = useSearchParams();

  const [success, setSuccess] = useState(searchParams.get('success'))
  const [wonAuctions, setWonAuctions] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      const req = await fetch('/api/wonAuctions')
      const res = await req.json()
      setWonAuctions(res)
    }

    getData()  

  }, [])

  useEffect(() => {
    const updateAuctionsToPaid = async () => {
      
      const body = {
        auctionIds: wonAuctions.map(auction => auction._id),
        update: {
          "$set": {
            "paid": true
          }
        }
      }

      console.log(body)
      const response = await fetch(`/api/auctions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const result = await response.json()

      console.log(result)
    }

    if (success && wonAuctions.length > 0) {
      updateAuctionsToPaid()
    }
  }, [wonAuctions])

  const handlePayAll = async () => {

    const session = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wonAuctions: wonAuctions
      }),
    });

    // Redirect to Stripe checkout page
    const body = await session.json()
    window.location.href = body.url

  }

  // spara wonactutions i server session och skapa en funktion i backend som markerar
  // dem som betalda när man kommer till success redirecten.
 
  return <>
    <h2 className="text-center my-4">Auctions waiting for payment</h2>
    <div className="text-center my-4">
      <Button onClick={handlePayAll} variant="success" size="lg">Pay All</Button>
    </div>
    {wonAuctions.map((auction, index) => (
    <StyleCard key={index}>
      <WonItem item={auction} />
    </StyleCard>
    ))}
  </>
}