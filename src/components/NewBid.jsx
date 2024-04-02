import { Button, Form, InputGroup, Row, Col, Badge } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from '../GlobalContext'

export default function NewBid(props) {
  const { loggedIn, setAuction } = useContext(GlobalContext)
  const { auction } = props

  let bidHistory = auction.bidHistory

  if (bidHistory.length === 0 || Object.keys(bidHistory[0]).length === 0) {
    bidHistory = [{amount: auction.startingPrice}]
  }

  const [highestBid, setHighestBid] = useState(getHighestBid(bidHistory))
  const [defaultBid, setDefaultBid] = useState(parseInt(highestBid) + 1)
  const [currentBid, setCurrentBid] = useState(defaultBid)
  const [error, setError] = useState(null)

  useEffect(() => {
    setHighestBid(getHighestBid(bidHistory))
    setDefaultBid(parseInt(highestBid) + 1)
  }, [bidHistory]);

  useEffect(() => {
    if (currentBid < defaultBid) {
      setError("Bid too low")
    } else {
      setError(false)
    }
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
      setError("Bid too low")
      // setError(`You need to bid at least: ${defaultBid} or higher`);
    }
  }

  return (
    <>
      <Form onSubmit={placeBid}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="newBid">
            {/* <Form.Label>Enter bid</Form.Label> */}
            <InputGroup>
              <Form.Control name="amount" type="number" defaultValue={defaultBid} onInput={changeCurrentBid}/>
            </InputGroup>
            <Form.Text className="text-muted">
              You need to bid at least: {defaultBid} or higher
            </Form.Text>
          </Form.Group>
          <Col>
            <Button variant="success" type="submit" className="me-2 btn-lg" disabled={!!error}>
              {error ? error : "Place bid"}
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Badge bg="light" className="text-dark p-2">Starting price: {auction.startingPrice}</Badge>
            <Badge bg="dark"className=" p-2 mx-2">Reserve price: {auction.reservePrice}</Badge>
          </Col>
        </Row>
      </Form>
    </>
  );
}