import { Table, Button, Container, Row, Col, ToggleButton } from "react-bootstrap";
import { formatDateTime } from "../pages/AuctionPage";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";

export default function LimitBidHistory(props) {
  // const { auction } = useContext(GlobalContext);
  const { auction } = props
  let bidHistory = auction.bidHistory;
  bidHistory.sort((a, b) => new Date(b.time) - new Date(a.time));

  const [bidsToShow, setBidsToShow] = useState(bidHistory.slice(0, 5));
  const [buttonText, setButtonText] = useState("Show more bids");
  const [showAllBids, setShowAllBids] = useState(false);

  function ShowMoreBids(event) {
    if (!showAllBids) {
      setBidsToShow(bidHistory);
      setButtonText("Show less bids");
    } else {
      setButtonText("Show more bids");
      setBidsToShow(bidHistory.slice(0, 5));
    }
    event.currentTarget.checked
    setShowAllBids(!showAllBids);
  }

  console.log("bidhistory rendered")
  return (
    <>
      <Row className="justify-content-end mb-2">
        <Col>
          {bidHistory.length > 5 ? 
            <ToggleButton className="" variant="secondary" type="checkbox" size="sm" checked={showAllBids} onClick={(event) => ShowMoreBids(event)}>
              {buttonText}
            </ToggleButton>
          : null}
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
    </>
  );
}
