import { Button, Form, InputGroup, Row, Col, Badge } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from '../GlobalContext'

export default function NewBid(props) {
  const { loggedIn } = useContext(GlobalContext)
  const { auction, updateAuction } = props
  const [highestBid, setHighestBid] = useState(null)
  const [defaultBid, setDefaultBid] = useState(null)
  const [currentBid, setCurrentBid] = useState(null)
  const [error, setError] = useState()

  useEffect(() => {
    setHighestBid(getHighestBid(auction.bidHistory))
    setDefaultBid(getHighestBid(auction.bidHistory) + 1)
    setError("Enter a bid")
  }, [auction]);

  useEffect(() => {
    if (currentBid === null) {
      setError("Enter a bid") 
    } else if (currentBid <= highestBid) {
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
    const bidAmount = parseInt(formData.get("amount"))
    
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
        updateAuction(auction)
        setCurrentBid(null)
        // setDefaultBid(parseInt(bidAmount) + 1)
        // setCurrentBid(0)
        // window.location.reload();
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
              <Form.Control name="amount" type="number" value={currentBid ? currentBid : 0} onInput={changeCurrentBid}/>
            </InputGroup>
            <Form.Text className="text-muted">
              Miniumum bid: {defaultBid}
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