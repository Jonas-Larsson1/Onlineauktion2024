import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import ListCard from "../components/ListItem";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function AccountPage() {
  const { loggedIn } = useContext(GlobalContext)
  const [bids, setBids] = useState(null);
  const [ongoingAuctions, setOngoingAuctions] = useState(null);
  const [closedAuctions, setClosedAuctions] = useState(null);
  const [savedAuctions, setSavedAuctions] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentDate = Date.now();

  function sortBids(bidHistory) {
    bidHistory.sort((a, b) => b.amount - a.amount)
    return bidHistory
  }

  // Fetches auctions where logged in user has placed a bid
  useEffect(() => {
    const getBidsData = async () => {
      const response = await fetch(`/api/auctions/`);
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
            break;
          }
        }

        if (userPlacedBid && auctionEndDate > currentDate) {
          currentBid.bidHistory = sortBids(currentBid.bidHistory)
          userBids.push(currentBid)
          break;
        }
      }
      setBids(userBids)
      setLoading(false);
    };

    getBidsData();
  }, []);

  // Fetches auctions that logged in user has started
  useEffect(() => {
    const getAuctionData = async () => {
      const response = await fetch(`/api/auctions/`);
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
            break;
          } else {
            currentAuction.bidHistory = sortBids(currentAuction.bidHistory)
            userClosedAuctions.push(currentAuction);
            break;
          }
        }
      }
      setOngoingAuctions(userOngoingAuctions);
      setClosedAuctions(userClosedAuctions);
      setLoading(false);
    };

    getAuctionData();
  }, []);

  // Fetches auctions that logged in user has saved
  useEffect(() => {
    const getSavedData = async () => {
      const response = await fetch(`/api/user/${loggedIn}`);
      const result = await response.json();

      const savedAuctionsDetails = [];
      for (const auctionId of result.savedAuctions) {
        const auctionResponse = await fetch(`api/auction/${auctionId}`);
        const auctionResult = await auctionResponse.json();
        if (auctionResult) {
          savedAuctionsDetails.push(auctionResult);
          break;
        }
      }

      if (savedAuctionsDetails.length === 0) {
        setSavedAuctions([]);
        setLoading(false);
      } else {
        setSavedAuctions(savedAuctionsDetails);
        setLoading(false);

      };
    };

    getSavedData();
  }, [loggedIn]);


  return (<>
    <Loading loading={loading} />

    <div className="pt-5" style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>
      {loggedIn ? (

        <div className="d-flex justify-content-center" style={{ width: '100%' }}>
          <div className="w-25">
            <StyleCard><h4 className="fst-italic fw-bold">Your auctions.</h4></StyleCard>
          </div>
        </div>

      ) : (
        <p>404</p>
      )}

      <div className="d-flex justify-content-center mt-5 pb-5">
        <StyleCard>
          <div className="d-flex flex-column">
            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your ongoing bids.</h5>
            {bids !== null ? (
              bids.length > 0 ? (
                bids.map((bid, index) => (
                  <div className="mt-5" key={index}>
                    <ListCard item={bid}></ListCard>
                    <div className="d-flex justify-content-center mt-5">
                      <Link className="ms-3 d-flex justify-content-center" to="/AccountPage/OngoingBids">
                        <h4 className="mx-2">View more </h4>
                        <img src="/src/assets/more.png" alt="View more" height="40px" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-3">You have no ongoing bids yet.</p>
              )
            ) : (
              <p className="text-center mt-3">404</p>
            )}
          </div>
        </StyleCard>

        <StyleCard>
          <div className="d-flex flex-column">
            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your ongoing auctions.</h5>
            {ongoingAuctions !== null ? (
              ongoingAuctions.length > 0 ? (
                ongoingAuctions.map((ongoingAuction, index) => (
                  <div className="mt-5" key={index}>
                    <ListCard item={ongoingAuction}></ListCard>
                    <div className="d-flex justify-content-center mt-5">
                      <Link className="ms-3 d-flex justify-content-center" to="/AccountPage/OngoingAuctions">
                        <h4 className="mx-2">View more </h4>
                        <img src="/src/assets/more.png" alt="View more" height="40px" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-3">You have no ongoing auctions yet.</p>
              )
            ) : (
              <p className="text-center mt-3">404</p>
            )}
          </div>
        </StyleCard>

        <StyleCard>
          <div className="d-flex flex-column">
            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your closed auctions.</h5>
            {closedAuctions !== null ? (
              closedAuctions.length > 0 ? (
                closedAuctions.map((closedAuction, index) => (
                  <div className="mt-5" key={index}>
                    <ListCard item={closedAuction}></ListCard>
                    <div className="d-flex justify-content-center mt-5">
                      <Link className="ms-3 d-flex justify-content-center" to="/AccountPage/ClosedAuctions">
                        <h4 className="mx-2">View more </h4>
                        <img src="/src/assets/more.png" alt="View more" height="40px" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-3">You have no closed auctions yet.</p>
              )
            ) : (
              <p className="text-center mt-3">404</p>
            )}
          </div>
        </StyleCard>

        <StyleCard>
          <div className="d-flex flex-column">
            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your saved auctions.</h5>
            {savedAuctions !== null ? (
              savedAuctions.length > 0 ? (
                savedAuctions.map((savedAuction, index) => (
                  <div className="mt-5" key={index}>
                    <ListCard item={savedAuction}></ListCard>
                    <div className="d-flex justify-content-center mt-5">
                      <Link className="ms-3 d-flex justify-content-center" to="/AccountPage/SavedAuctions">
                        <h4 className="mx-2">View more </h4>
                        <img src="/src/assets/more.png" alt="View more" height="40px" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-3">You have no saved auctions yet.</p>
              )
            ) : (
              <p className="text-center mt-3">404</p>
            )}
          </div>
        </StyleCard>


      </div>
    </div>
  </>);
}