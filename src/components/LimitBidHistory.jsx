import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { formatDateTime } from "../pages/AuctionPage";
import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";

export default function LimitBidHistory() {
  const { auction } = useContext(GlobalContext);
  const bidHistory = auction.bidHistory;

  bidHistory.sort((a, b) => new Date(b.time) - new Date(a.time));

  const [bidsToShow, setBidsToShow] = useState(bidHistory.slice(0, 5));
  const [buttonText, setButtonText] = useState("Show more bids");
  const [showAllBids, setShowAllBids] = useState(false);

  function ShowMoreBids() {
    if (showAllBids) {
      setBidsToShow(bidHistory);
      setButtonText("Hide bids");
    } else {
      setButtonText("Show more bids");
      setBidsToShow(bidHistory.slice(0, 5));
    }
    setShowAllBids(!showAllBids);
  }

  return (
    <Container>
      <Row className="justify-content-end mb-2">
        <Col xs={12} md={6} lg={4} className="text-end">
          <Button variant="light" size="sm" onClick={ShowMoreBids}>
            {buttonText}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover variant="dark" size="sm">
            <thead>
              <tr>
                <th>Bidding history</th>
                <th>User</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bidsToShow.map((bid, index) => (
                <tr key={index}>
                  <td>{formatDateTime(bid.time)}</td>
                  <td>{bid.userId}</td>
                  <td>{bid.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
