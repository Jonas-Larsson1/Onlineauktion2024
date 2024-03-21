import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { GlobalContext } from '../GlobalContext'

export default function NewBid() {

  const getHighestBid = (bidHistory) => {
    bidHistory.sort((a, b) => (b.amount) - (a.amount))
    return bidHistory[0].amount
  }

  const placeBid = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const bidData = {
      amount: formData.get("amount")
    };
  
    if (bidData.amount > highestBid) {
      // Vi måste kolla om det har kommit in ett högre bud sen sidan först laddades innan vi lägger in det nya budet
      // const getData = async () => {
      //   const response = await fetch(`/api/auctions/${auction.id}`);
      //   const result = await response.json();
      // }
      
      auction.bidHistory.push({
        "userId": 1, // Måste bytas ut till den aktivt inloggade användaren
        "time": Date.now(),
        "amount": bidData.amount
      })

      const response = await fetch(`/api/auctions/${auction.id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auction)
      })

      if (response.ok) {
        alert("Det gick bra!")
      } else {
        alert("Det gick åt helvete!")
      }
      
    } else {
      alert("va fan")
    }
  }

  const { auction } = useContext(GlobalContext)
  const bidHistory = auction.bidHistory
  let highestBid = getHighestBid(bidHistory)

  return (
    <Form onSubmit={placeBid}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="newBid">
          <Form.Label>Enter bid</Form.Label>
          <InputGroup>
            <Form.Control name="amount" type="number" defaultValue={highestBid}/>
            <Form.Text className="text-muted">
              You need to bid at least: {highestBid} or higher
            </Form.Text>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="info" type="submit" className="me-2 btn-lg">
            Place bid
          </Button>

          <Button variant="secondary" className="btn-sm">
            Add to watchlist
          </Button>
        </Col>
      </Row>
    </Form>
  );
}