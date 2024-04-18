import { Button, Form, InputGroup, Row, Col, Badge } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { formatDateTime } from "../pages/AuctionPage";
import io from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';

export default function NewBid(props) {
  const { loggedIn } = useContext(GlobalContext);

  const { auction, updateAuction } = props;

  const [highestBid, setHighestBid] = useState(null);
  const [defaultBid, setDefaultBid] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);
  const [error, setError] = useState();
  const [endDateObject, setEndDateObject] = useState(
    auction.endDate ? new Date(auction.endDate) : null
  );
  const [newBid, setNewBid] = useState([]);
  const [socket, setSocket] = useState(null);



  useEffect(() => {
    const newSocket = io("http://localhost:5500");

    newSocket.on("newBidAdded", (bidData) => {
      console.log(bidData)
      setNewBid(prevBids => [...prevBids, bidData]);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const currentDate = new Date();


  useEffect(() => {
  if (newBid.length > 0) {
    const latestBid = newBid[newBid.length - 1]; // Get the latest bid
    displayNotification(latestBid);
  }
}, [newBid]);

  useEffect(() => {
    if (auction.endDate) {
      setEndDateObject(new Date(auction.endDate));
    }
  }, [auction.endDate]);

  useEffect(() => {
    setHighestBid(getHighestBid(auction.bidHistory));
    setDefaultBid(getHighestBid(auction.bidHistory) + 1);
    setError("Enter a bid");
  }, [auction]);

  useEffect(() => {
    const endDateFormatted = formatDateTime(endDateObject);
    const endDateDate = new Date(endDateFormatted);

    if (endDateDate < currentDate) {
      setError("The auction is closed");
    } else if (currentBid <= highestBid) {
      setError("Bid too low");
    } else if (currentBid === null) {
      setError("Enter a bid");
    } else {
      setError(false);
    }
  }, [currentBid, endDateObject, currentDate]);

  function getHighestBid(bidHistory) {
    bidHistory.sort((a, b) => b.amount - a.amount);
    return bidHistory.length > 0 ? bidHistory[0].amount : 0;
  }

  const changeCurrentBid = (event) => {
    setCurrentBid(event.target.value);
  };

  useEffect(() => {
    if (newBid) {
      displayNotification(newBid);
    }
  }, [newBid]);

  const displayNotification = ({ username, bidAmount, title }) => {

    if(username == undefined){
      return false
    }else {
      toast(`New bid from ${username} \n On: ${title} \n Amount: ${bidAmount} `);
    }
   
  };

  
  

  const placeBid = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bidAmount = parseInt(formData.get("amount"));

    if (bidAmount > highestBid) {
      const res = await fetch(`/api/user/getUsername/${loggedIn}`);
      const username = await res.json();
      const newBid = {
        userId: loggedIn,
        time: Date.now(),
        amount: bidAmount,
        username: username,
      };

      auction.bidHistory.push(newBid);

      

      //pls change me ! only newBid data upload or crosscheck auction data on server!
      const response = await fetch(`/api/auction/${auction._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auction),
      });
        
        

      if (response.ok) {
  
        updateAuction(auction);
        setCurrentBid(null);
        socket.emit("newBidNotification", {
          userId: loggedIn,
          username: username,
          bidAmount: bidAmount,
          title: auction.title,
        });
      } else {
        // säg åt användaren det gick åt skogen
        alert("I did not work.");
      }
    } else {
      setError("Bid too low");
    }
  };

  


  return (
    <>
      

      <Form onSubmit={placeBid}>
      {/* <div className="notifications">
          {newBid.map((n) => displayNotification(n))}
        </div> */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="newBid">
            <InputGroup>
              <Form.Control
                name="amount"
                type="number"
                placeholder={0}
                disabled={!!error && error === "The auction is closed"}
                value={currentBid ? currentBid : " "}
                onInput={changeCurrentBid}
              />
            </InputGroup>
            <Toaster 
            position="top-center"
            gutter={12}
            containerStyle={{margin:"8px"}}
            toastOptions={{
              success: {
                duration: 15000
              },
              style: {
                fontSize: "16px",
                maxWidth:"500px",
                padding: "16px 24px",
                backgroundColor:"green"
              }
            }}
            />

            <Form.Text className="text-muted">
              Miniumum bid: {defaultBid}
            </Form.Text>
          </Form.Group>
          <Col>
            <Button
              variant={error === "The auction is closed" ? "danger" : "success"}
              type="submit"
              className="me-2 btn-lg"
              disabled={!!error}
            >
              {error ? error : "Place bid"}
            </Button>
          </Col>
        </Row>
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
