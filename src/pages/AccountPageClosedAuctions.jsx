import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import ListCard from "../components/ListItem";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";


export default function AccountPage() {
    const { loggedIn } = useContext(GlobalContext)
    const [user, setUser] = useState(null);
    const [closedAuctions, setClosedAuctions] = useState(null);
    const [ongoingAuctions, setOngoingAuctions] = useState(null);

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
        <div className="mt-5">
            <Link className="mx-5" to="/AccountPage">
                <img src="/src/assets/goback.png" alt="Go back" height="50px" />
            </Link>
        </div>

        <div style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>

            <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                <div className="w-25">
                    <StyleCard><h4 className="fst-italic fw-bold">Your closed auctions.</h4></StyleCard>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-5 pb-5">
                <div className="d-flex justify-content-center flex-row mx-3 px-3" style={{ maxWidth: '100', flexWrap: 'wrap' }}>
                    {closedAuctions ? closedAuctions.map((closedAuction, index) => (
                        <div key={index} className="mx-3 mt-3">
                            <StyleCard>
                                <div className="d-flex flex-column">
                                    <ListCard item={closedAuction}></ListCard>
                                </div>
                            </StyleCard>
                        </div>
                    )) : <p>Ain't no auction here, Mr. Auctioneer.</p>}
                </div>

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