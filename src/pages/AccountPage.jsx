import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import { Row, Col } from "react-bootstrap";
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
    // Hämtar inloggade användaren
    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`http://localhost:3000/users/${loggedIn}`);
            const result = await response.json();
            setUser(result);
        };

        getUserData();
    }, []);


    // Hämtar auktioner där inloggade användaren har lagt ett bud
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

    // Hämtar auktioner där inloggade användaren har startat en auktion
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

                    // Kollar om datumet på endDate har passerat
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

    return (
        <>
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
                                        <img src={bid.images[0]} className="account-img border" />
                                        <h4 className="fw-bold">{bid.title}</h4>
                                    </Link>
                                    <Row>
                                        <Col m={6}>
                                            <p>Highest bid: {bid.bidHistory[0].amount}€</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col m={6}>
                                            <p>Auction start: {formatDateTime(bid.startDate)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col m={6}>
                                            <p>Auction end: {formatDateTime(bid.endDate)}</p>
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
                                    <Link to={`/AuctionPage/${ongoingAuctions.id}`}>
                                        <img src={ongoingAuctions.images[0]} className="account-img border" />
                                        <h4 className="fw-bold">{ongoingAuctions.title}</h4>
                                    </Link>
                                    <Row>
                                        <Col m={6}>
                                            <p>Highest bid: {ongoingAuctions.bidHistory[0].amount}€</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col m={6}>
                                            <p>Auction start: {formatDateTime(ongoingAuctions.startDate)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col m={6}>
                                            <p>Auction end: {formatDateTime(ongoingAuctions.endDate)}</p>
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
                                    <Link to={`/AuctionPage/${closedAuctions.id}`}>
                                        <img src={closedAuctions.images[0]} className="account-img border" />
                                        <h4 className="fw-bold">{closedAuctions.title}</h4>
                                    </Link>
                                    <Row>
                                        <Col m={6}>
                                            <p>Winning bid: {closedAuctions.bidHistory[0].amount}€</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col m={6}>
                                            <p>Auction start: {formatDateTime(closedAuctions.startDate)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col m={6}>
                                            <p>Auction end: {formatDateTime(closedAuctions.endDate)}</p>
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