import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import ListCard from "../components/ListItem";
import { GlobalContext } from "../GlobalContext";
import BackButton from "../components/BackButton";

export default function AccountPage() {
    const { loggedIn } = useContext(GlobalContext);
    const [savedAuctions, setSavedAuctions] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`/api/user/${loggedIn}`);
            const result = await response.json();
            setUser(result);
    

            const savedAuctionsDetails = [];
            for (const auctionId of result.savedAuctions) {
                const auctionResponse = await fetch(`/api/auction/${auctionId}`);
                const auctionResult = await auctionResponse.json();
                savedAuctionsDetails.push(auctionResult);
            }

            savedAuctionsDetails.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
            setSavedAuctions(savedAuctionsDetails); 
        };
    
        getUserData();
    }, []);

    // Printing out info
    return (
        <>
            <BackButton to="/AccountPage" />

            <div style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>

                <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                    <div className="w-25">
                        <StyleCard><h4 className="fst-italic fw-bold">Your saved auctions.</h4></StyleCard>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5 pb-5">
                    <div className="d-flex justify-content-center flex-row mx-3 px-3" style={{ maxWidth: '100', flexWrap: 'wrap' }}>
                        {savedAuctions ? savedAuctions.map((savedAuction, index) => (
                            <div key={index} className="mx-3 mt-3">
                                <StyleCard>
                                    <div className="d-flex flex-column">
                                        <ListCard item={savedAuction}></ListCard>
                                    </div>
                                </StyleCard>
                            </div>
                        )) : <p>Ain't no auction here, Mr. Auctioneer.</p>}
                    </div>
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
