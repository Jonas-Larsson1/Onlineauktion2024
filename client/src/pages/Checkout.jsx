import { useEffect, useState } from "react"
import StyleCard from "../components/StyleCard";
import WonItem from "../components/WonItem";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function Checkout () {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState(searchParams.get('success'))
  const [paymentId, setPaymentId] = useState(searchParams.get('payment_id'))
  const [wonAuctions, setWonAuctions] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      let auctionsToProcess
      const response = await fetch('/api/wonAuctions')

      if (response.ok) {
        auctionsToProcess = await response.json()
      }

      if (!success) {
        setWonAuctions(auctionsToProcess)
      } else {
        console.log(paymentId)
        console.log(success)

        const body = {
          auctionIds: auctionsToProcess.map(auction => auction._id)
        }
  
        const response = await fetch(`/api/pay-for-auctions/${paymentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })

        const result = await response.json()
        console.log(result)
      }
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