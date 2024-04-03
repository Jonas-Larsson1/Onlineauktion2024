import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import { Table } from "react-bootstrap";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";

export default function AccountPage() {
  const { loggedIn } = useContext(GlobalContext)
  const [user, setUser] = useState(null);
  const [bids, setBids] = useState(null);
  const [ongoingAuctions, setOngoingAuctions] = useState(null);
  const [closedAuctions, setClosedAuctions] = useState(null);

  const currentDate = new Date();

  function sortBids(bidHistory) {
    bidHistory.sort((a, b) => b.amount - a.amount)
    return bidHistory
  }

  // Fetches the logged in user
  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`http://localhost:3000/users/${loggedIn}`);
      const result = await response.json();
      setUser(result);
    };

    getUserData();
  }, []);


  // Fetches auctions where logged in user has placed a bid
  useEffect(() => {
    const getBidsData = async () => {
      const response = await fetch(`http://localhost:3000/auctions/`);
      const result = await response.json();

      const userBids = []

      for (let i = 0; i < result.length; i++) {
        let currentBid = result[i]
        let userPlacedBid = false
        const auctionEndDate = new Date(currentBid.endDate);

        for (let j = 0; j < currentBid.bidHistory.length; j++) {
          let currentBidding = currentBid.bidHistory[j]


          if (currentBidding.userId === loggedIn) {
            userPlacedBid = true
            break
          }
        }

        if (userPlacedBid && auctionEndDate > currentDate) {
          currentBid.bidHistory = sortBids(currentBid.bidHistory)
          userBids.push(currentBid)
        }
      }
      setBids(userBids)
    };

    getBidsData();
  }, [user]);

  // Fetches auctions that logged in user has started
  useEffect(() => {
    const getAuctionData = async () => {
      const response = await fetch(`http://localhost:3000/auctions/`);
      const result = await response.json();

      const userOngoingAuctions = [];
      const userClosedAuctions = [];

      for (let i = 0; i < result.length; i++) {
        let currentAuction = result[i]

        if (currentAuction.sellerId === loggedIn) {
          const auctionEndDate = new Date(currentAuction.endDate);

          // Checks if the end date of the auctions has passed
          if (auctionEndDate > currentDate) {
            currentAuction.bidHistory = sortBids(currentAuction.bidHistory)
            userOngoingAuctions.push(currentAuction);
          } else {
            currentAuction.bidHistory = sortBids(currentAuction.bidHistory)
            userClosedAuctions.push(currentAuction);
          }
        }
      }
      setOngoingAuctions(userOngoingAuctions);
      setClosedAuctions(userClosedAuctions);
    };

    getAuctionData();
  }, [user]);

  // Printing out info
  return (<>
    <div className="pt-5" style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>
      {user ? (
        <StyleCard><h4 className="fst-italic fw-bold">Welcome back, {user.username}.</h4></StyleCard>
      ) : (
        <p>404</p>
      )}

      <div className="d-flex justify-content-center mt-5 pb-5">
        <StyleCard>
          <div className="d-flex flex-column">
            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your ongoing bids.</h5>
            {bids ? bids.map((bid, index) => (
              <div key={index} className="m-3 pt-5 ">
                <Link to={`/AuctionPage/${bid.id}`}>
                  <div className="d-flex justify-content-center">
                    <img src={bid.images[0]} className="account-img border" style={{ height: "13rem" }} />
                  </div>
                  <h4 className="fw-bold d-flex justify-content-center">{bid.title}</h4>
                </Link>

                <Table striped bordered hover variant="dark" size="sm">
                  <thead>
                    <tr>
                      <th>Highest bid</th>
                      <th>Auction start</th>
                      <th>Auction end</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={index}>
                      <td>{bid.bidHistory[0].amount}€</td>
                      <td>{formatDateTime(bid.startDate)}</td>
                      <td> {formatDateTime(bid.endDate)}</td>
                    </tr>
                  </tbody>
                </Table>


              </div>)) : <p>404: Ain't no auction here, Mr. Auctioneer.</p>}
          </div>
        </StyleCard>

        <StyleCard>
          <div className="d-flex flex-column">
            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your ongoing auctions.</h5>
            {ongoingAuctions ? ongoingAuctions.map((ongoingAuctions, index) => (
              <div key={index} className="m-3 pt-5 ">
                <Link to={`/AuctionPage/${ongoingAuctions.id}`}>
                  <div className="d-flex justify-content-center">
                    <img src={ongoingAuctions.images[0]} className="account-img border" style={{ height: "13rem" }} />
                  </div>
                  <h4 className="fw-bold d-flex justify-content-center">{ongoingAuctions.title}</h4>
                </Link>
                <Table striped bordered hover variant="dark" size="sm">
                  <thead>
                    <tr>
                      <th>Highest bid</th>
                      <th>Auction start</th>
                      <th>Auction end</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={index}>
                      <td>{ongoingAuctions.bidHistory[0].amount}€</td>
                      <td>{formatDateTime(ongoingAuctions.startDate)}</td>
                      <td> {formatDateTime(ongoingAuctions.endDate)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>)) : <p>404: Ain't no auction here, Mr. Auctioneer.</p>}
          </div>
        </StyleCard>

        <StyleCard>
          <div className="d-flex flex-column">
            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your closed auctions.</h5>
            {closedAuctions ? closedAuctions.map((closedAuctions, index) => (
              <div key={index} className="m-3 pt-5 ">
                <Link to={`/AuctionPage/${closedAuctions.id}`}>
                  <div className="d-flex justify-content-center">
                    <img src={closedAuctions.images[0]} className="account-img border" style={{ height: "13rem" }} />
                  </div>
                  <h4 className="fw-bold d-flex justify-content-center">{closedAuctions.title}</h4>
                </Link>
                <Table striped bordered hover variant="dark" size="sm">
                  <thead>
                    <tr>
                      <th>Winning bid</th>
                      <th>Auction start</th>
                      <th>Auction end</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={index}>
                      <td>{closedAuctions.bidHistory[0].amount}€</td>
                      <td>{formatDateTime(closedAuctions.startDate)}</td>
                      <td> {formatDateTime(closedAuctions.endDate)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>)) : <p>404: Ain't no auction here, Mr. Auctioneer.</p>}
          </div>
        </StyleCard>
      </div>
    </div>
  </>);
}

export function formatDateTime(dateTimeString) {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "UTC"
  };

  const formattedDate = new Date(dateTimeString).toLocaleDateString(
    "sv-SE",
    options
  );

  return formattedDate;
}