import { useEffect, useState } from "react"
import StyleCard from "../components/StyleCard";
import WonItem from "../components/WonItem";
import { Button } from "react-bootstrap";

export default function Checkout () {
  const [wonAuctions, setWonAuctions] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      const req = await fetch('/api/wonAuctions')
      const res = await req.json()
      setWonAuctions(res)
    }

    getData()
    
  }, [])

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