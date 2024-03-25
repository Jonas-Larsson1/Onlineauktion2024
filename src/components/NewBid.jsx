import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from '../GlobalContext'
import AddToWatchList from "./AddToWatchList";

export default function NewBid() {
  const { auction, setAuction, loggedIn } = useContext(GlobalContext)
  const bidHistory = auction.bidHistory
  const [highestBid, setHighestBid] = useState(getHighestBid(bidHistory))
  const [defaultBid, setDefaultBid] = useState(parseInt(highestBid) + 1)
  const [currentBid, setCurrentBid] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    setHighestBid(getHighestBid(bidHistory))
    setDefaultBid(parseInt(highestBid) + 1)
  }, [bidHistory]);

  useEffect(() => {
    setError(false)
  }, [currentBid])

  function getHighestBid (bidHistory) {
    bidHistory.sort((a, b) => (b.amount) - (a.amount))
    return bidHistory.length > 0 ? bidHistory[0].amount : 0
  }

  const changeCurrentBid = (event) => {
    setCurrentBid(event.target.value)
  }

  const placeBid = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target)
    const bidAmount = formData.get("amount")
    
    if (bidAmount > highestBid) {
      const newBid = {
        userId: loggedIn, 
        time: Date.now(),
        amount: bidAmount
      }
  
      auction.bidHistory.push(newBid)

      const response = await fetch(`/api/auctions/${auction.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auction)
      })

      if (response.ok) {
        setAuction(auction)
        setDefaultBid(parseInt(bidAmount) + 1)
        setError(false)
      } else {
        // säg åt användaren det gick åt skogen
      }
    } else {
      setError(`You need to bid at least: ${defaultBid} or higher`);
    }
  }

  return <>
    <Form onSubmit={placeBid}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="newBid">
          <Form.Label>Enter bid</Form.Label>
          <InputGroup>
            <Form.Control name="amount" type="number" defaultValue={defaultBid} onInput={changeCurrentBid}/>
            <Form.Text className="text-muted">
              {/* You need to bid at least: {defaultBid} or higher */}
            </Form.Text>
          </InputGroup>
          {error && <div className="alert alert-warning mt-2 mb-0" role="alert">
            {error}
          </div>}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="info" type="submit" className="me-2 btn-lg">
            Place bid
          </Button>
        </Col>
      </Row>
    </Form>
    <AddToWatchList />
  </>
}