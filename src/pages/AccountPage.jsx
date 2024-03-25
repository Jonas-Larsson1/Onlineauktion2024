import React, { useEffect, useState } from "react";
import StyleCard from "../components/StyleCard";
import { Row, Col } from "react-bootstrap";

export default function AccountPage() {
    const loggedInId = 1; // Tillfälligt hårdkodat Id, byta ut till den som actually är inloggad sen
    const userId = 1; // Tillfälligt hårdkodat Id, byta ut till den som actually är inloggad sen

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [bids, setBids] = useState(null);
    const [ongoingAuctions, setOngoingAuctions] = useState(null);
    const [closedAuctions, setClosedAuctions] = useState(null);

    const currentDate = new Date();

    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`http://localhost:3000/users/${loggedInId}`);
            const result = await response.json();
            setLoggedInUser(result);
        };

        getUserData();
    }, [loggedInId]);

    useEffect(() => {
        const getBidsData = async () => {
            const response = await fetch(`http://localhost:3000/auctions/`);
            const result = await response.json();


            const userBids = []

            // console.log("result:", result)
            for (let i = 0; i < result.length; i++) {
                let currentBid = result[i]
                let userPlacedBid = false

                for (let j = 0; j < currentBid.bidHistory.length; j++) {
                    let currentBidding = currentBid.bidHistory[j]

                    if (currentBidding.userId === userId) {
                        userPlacedBid = true
                        break
                    }
                }

                if (userPlacedBid) {
                    userBids.push(currentBid)
                }
            }

            setBids(userBids)
        };

        getBidsData();
    }, [userId]);


    useEffect(() => {
        const getAuctionData = async () => {
            const response = await fetch(`http://localhost:3000/auctions/`);
            const result = await response.json();
            // setAuctions(result);

            const userOngoingAuctions = [];
            const userClosedAuctions = [];

            // console.log("result:", result)
            for (let i = 0; i < result.length; i++) {
                let currentAuction = result[i]

                if (currentAuction.sellerId === userId) {
                    const auctionEndDate = new Date(currentAuction.endDate); 

                    if (auctionEndDate > currentDate) {
                        userOngoingAuctions.push(currentAuction);
                    } else {
                        userClosedAuctions.push(currentAuction);
                    }
                }

            }

            setOngoingAuctions(userOngoingAuctions);
            setClosedAuctions(userClosedAuctions);
        };

        getAuctionData();
    }, [userId]);

    return (
        <>
            <div className="pt-5" style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>
                {loggedInUser ? (
                    <StyleCard><h4 className="fst-italic fw-bold">Welcome back, {loggedInUser.username}.</h4></StyleCard>
                ) : (
                    <p>404</p>
                )}

                <div className="d-flex justify-content-center mt-5">
                    <StyleCard>
                        <div className="d-flex flex-column">
                            <h5 className="fst-italic fw-bold d-flex justify-content-center">Your ongoing bids.</h5>
                            {bids ? bids.map((bid, index) => (
                                <div key={index} className="m-3 pt-5 ">
                                    <h4 className="fw-bold">{bid.title}</h4>
                                    <Row>
                                        <Col sm={6}>
                                            <p>{bid.description}</p>
                                        </Col>
                                    </Row>
                                </div>)) : <p>Ain't no auction here, Mr. Auctioneer.</p>}
                        </div>
                    </StyleCard>

                    <StyleCard>
                        <div className="d-flex flex-column">
                        <h5 className="fst-italic fw-bold d-flex justify-content-center">Your ongoing auctions.</h5>
                            {ongoingAuctions ? ongoingAuctions.map((ongoingAuctions, index) => (
                                <div key={index} className="m-3 pt-5 ">
                                    <h4 className="fw-bold">{ongoingAuctions.title}</h4>
                                    <Row>
                                        <Col sm={6}>
                                            <p>{ongoingAuctions.description}</p>
                                        </Col>
                                    </Row>
                                </div>)) : <p>Ain't no auction here, Mr. Auctioneer.</p>}
                        </div>
                    </StyleCard>

                    <StyleCard>
                        <div className="d-flex flex-column">
                        <h5 className="fst-italic fw-bold d-flex justify-content-center">Your closed auctions.</h5>
                            {closedAuctions ? closedAuctions.map((closedAuctions, index) => (
                                <div key={index} className="m-3 pt-5 ">
                                    <h4 className="fw-bold">{closedAuctions.title}</h4>
                                    <Row>
                                        <Col sm={6}>
                                            <p>{closedAuctions.description}</p>
                                        </Col>
                                    </Row>
                                </div>)) : <p>Ain't no auction here, Mr. Auctioneer.</p>}
                        </div>
                    </StyleCard>
                </div>
            </div>
        </>
    );
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