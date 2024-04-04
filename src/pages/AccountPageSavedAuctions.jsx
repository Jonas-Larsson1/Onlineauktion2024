import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import ListCard from "../components/ListItem";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";

export default function AccountPage() {
    const { loggedIn } = useContext(GlobalContext);
    const [savedAuctions, setSavedAuctions] = useState(null);
    const currentDate = new Date();

    function sortSaves(savedAuctions) {
        savedAuctions.sort((a, b) => b.amount - a.amount);
        return savedAuctions;
    }

    // Fetches auctions that logged in user has saved
    useEffect(() => {
        const getSavedData = async () => {

            const response = await fetch(`http://localhost:3000/auctions/`);
            const result = await response.json();

            const userSavedAuctions = [];

            for (let i = 0; i < result.length; i++) {
                let user = result[i];
                let userHasSaved = false;
                const auctionEndDate = new Date(user.endDate);

                if (!user.savedByUser) continue; 

                for (let j = 0; j < user.savedByUser.length; j++) {
                    let userSaved = user.savedByUser[j];

                    if (userSaved === loggedIn) {
                        userHasSaved = true;
                        break;
                    }
                }

                // Checks if the end date of the auctions has passed
                if (userHasSaved && auctionEndDate > currentDate) {
                    user.bidHistory = sortSaves(user.bidHistory);
                    userSavedAuctions.push(user);
                }
            }
            setSavedAuctions(userSavedAuctions);
        };

        getSavedData();
    }, [loggedIn]);

    // Printing out info
    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-5 border rounded mx-5" style={{ width: "70px", height: "70px", background: "#C38D9E" }}>
                <Link to="/AccountPage">
                    <img src="/src/assets/goback.png" alt="Go back" height="50px" />
                </Link>
            </div>

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
