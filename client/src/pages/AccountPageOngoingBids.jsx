import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import ListCard from "../components/ListItem";
import { GlobalContext } from "../GlobalContext";
import BackButton from "../components/BackButton";

export default function AccountPage() {
    const { loggedIn } = useContext(GlobalContext)
    const [bids, setBids] = useState(null);
    const currentDate = Date.now();

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
                    userBids.push(currentBid)
                }
            }
            userBids.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
            setBids(userBids)
        };

        getBidsData();
    }, []);

    // Printing out info
    return (
        <>
            <BackButton to="/AccountPage" />

            <div style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>
                <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                    <div className="w-25">
                        <StyleCard><h4 className="fst-italic fw-bold">Your ongoing bids.</h4></StyleCard>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5 pb-5">
                    <div className="d-flex justify-content-center flex-row mx-3 px-3" style={{ maxWidth: '100', flexWrap: 'wrap' }}>
                        {bids ? bids.map((bid, index) => (
                            <div key={index} className="mx-3 mt-3">
                                <StyleCard>
                                    <div className="d-flex flex-column">
                                        <ListCard item={bid}></ListCard>
                                    </div>
                                </StyleCard>
                            </div>
                        )) : <p>Ain't no auction here, Mr. Auctioneer.</p>}
                    </div>
                </div>
            </div>
        </>);
}