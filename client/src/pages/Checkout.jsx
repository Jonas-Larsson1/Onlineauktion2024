import { useEffect, useState } from "react"
import StyleCard from "../components/StyleCard.jsx";
import WonItem from "../components/WonItem.jsx";
import { Button } from "react-bootstrap";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState(searchParams.get('success'))
  const [paymentId, setPaymentId] = useState(searchParams.get('payment_id'))
  const [wonAuctions, setWonAuctions] = useState(false)
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      let auctionsToProcess
      const response = await fetch('/api/wonAuctions')

      if (response.ok) {
        auctionsToProcess = await response.json()
      }

      if (success !== "true" && auctionsToProcess.length > 0) {
        setWonAuctions(auctionsToProcess)
      } else if (success === "true") {

        const body = {
          auctionIds: auctionsToProcess.map(auction => auction._id)
        }

        const response = await fetch(`/api/pay-for-auctions/${paymentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })

        const result = await response.json()
        navigate('/checkout?success=completed')
      }
      setLoading(false)
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

  return (
    <>
      <Loading loading={loading} />
      {(success === "true") ? (
        <div className="container mt-5">
          <h1>Success! Your purchase was completed.</h1>
          <p>Thank you for shopping with us.</p>
          <Button className="mb-5" as={Link} to="/">Return to Home</Button>
        </div>
      ) : (
        <>
          <h2 className="text-center my-4">Auctions waiting for payment</h2>
          <div className="text-center my-4">
            <Button onClick={handlePayAll} variant="success" size="lg" disabled={!wonAuctions}>Pay All</Button>
          </div>
          {wonAuctions ? 
            <StyleCard >
            {wonAuctions.map((auction, index) => (
              <WonItem className="mx-5" item={auction} key={index} />
            ))}
          </StyleCard>
          : <p className="text-center m-5">You have no won auctions to pay for.</p>}
        </>
      )}
    </>
  );
}