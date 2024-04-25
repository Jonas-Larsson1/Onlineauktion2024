import { Button, Form, InputGroup, Row, Col, Badge } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { formatDateTime } from "../pages/AuctionPage.jsx";
import { Toaster } from "react-hot-toast";

export default function NewBid(props) {
  const { loggedIn, isCreator } = useContext(GlobalContext);

  const { auction, updateAuction } = props;

  const [highestBid, setHighestBid] = useState(null);
  const [defaultBid, setDefaultBid] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);
  const [error, setError] = useState();
  const [endDateObject, setEndDateObject] = useState(
    auction.endDate ? new Date(auction.endDate) : null
  );
  const [startDateObject, setStartDateObject] = useState(
    auction.startDate ? new Date(auction.startDate) : null
  );

  const { socket } = useContext(GlobalContext);

  const currentDate = new Date();

  useEffect(() => {
    if (auction.endDate) {
      setEndDateObject(new Date(auction.endDate));
    }
  }, [auction.endDate]);

    useEffect(() => {
      if (auction.startDate) {
        setStartDateObject(new Date(auction.startDate));
      }
    }, [auction.startDate]);

  useEffect(() => {
    setHighestBid(getHighestBid(auction.bidHistory));
    setDefaultBid(getHighestBid(auction.bidHistory) + 1);
    setError("Enter a bid");
  }, [auction]);

  useEffect(() => {
    const endDateFormatted = formatDateTime(endDateObject);
    const endDateDate = new Date(endDateFormatted);
    const startDateFormatted = formatDateTime(startDateObject);
    const startDateDate = new Date(startDateFormatted);

    if (endDateDate < currentDate) {
      setError("The auction is closed");
    } else if (startDateDate > currentDate) {
      setError("Auction hasn't begun yet!");
    } else if (currentBid <= highestBid) {
      setError("Bid too low");
    } else if (currentBid === null) {
      setError("Enter a bid");
    } else {
      setError(false);
    }
  }, [currentBid, endDateObject, currentDate, startDateObject]);

  function getHighestBid(bidHistory) {
    bidHistory.sort((a, b) => b.amount - a.amount);
    return bidHistory.length > 0 ? bidHistory[0].amount : 0;
  }

  const changeCurrentBid = (event) => {
    setCurrentBid(event.target.value);
  };

  const placeBid = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bidAmount = parseInt(formData.get("amount"));

    if (bidAmount > highestBid) {
      const user = await fetch(`/api/user/${loggedIn}`);
      const userResult = await user.json();

      const newBid = {
        userId: loggedIn,
        time: Date.now(),
        amount: bidAmount,
        username: userResult.username,
      };

      auction.bidHistory.push(newBid);
      
      const response = await fetch(`/api/auction/newBid/${auction._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auction: auction,
          user: loggedIn,
        }),
      });

      if (response.ok) {
        if (auction.bidHistory.length > 1)
          socket.emit("newBidNotification", {
            senderId: loggedIn,
            recieverId: auction.bidHistory[0].userId,
            username: userResult.username,
            bidAmount: bidAmount,
            title: auction.title,
          });
        updateAuction(auction);
      } else {
        alert("I did not work.");
      }
    } else {
      setError("Bid too low");
    }
  };

  return (
    <>
      <Form onSubmit={placeBid}>
            {!isCreator ? 
        <Row className="mb-3">
          <Form.Group as={Col} controlId="newBid">
            <InputGroup>
              <Form.Control
                name="amount"
                type="number"
                placeholder={0}
                disabled={
                  (!!error && error === "The auction is closed") ||
                  error === "Auction hasn't begun yet!"
                }
                value={currentBid ? currentBid : " "}
                onInput={changeCurrentBid}
                />
            </InputGroup>

            <Form.Text className="text-muted">
              Miniumum bid: {defaultBid}
            </Form.Text>
          </Form.Group>
          <Col>
            <Button
              variant={error ?  "danger" : "success"}
              type="submit"
              className="me-2 btn-lg"
              disabled={!!error}
              >
              {error ? error : "Place bid"}
            </Button>
          </Col>
        </Row>
                : ""}
        <Row className="mb-3">
          <Col>
            <Badge bg="light" className="text-dark p-2">
              Starting price: {auction.startingPrice}
            </Badge>
            <Badge bg="dark" className=" p-2 mx-2">
              Reserve price: {auction.reservePrice}
            </Badge>
          </Col>
        </Row>
      </Form>
    </>
  );
}
