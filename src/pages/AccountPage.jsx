import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function AccountPage() {
    const id = 1; // Tilfälligt id för att hämta in användare, byta ut senare till actually inloggad
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`http://localhost:3000/users/${id}`);
            const result = await response.json();
            setUser(result);
        };

        getData();
    }, [id]);

    return (
        <>
            <div className="pt-5" style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>

                {user ? (
                    <Card><h4 className="fst-italic fw-bold">Welcome back, {user.username}.</h4></Card>
                ) : (
                    <p>404</p>
                )}


                <div className="d-flex justify-content-center mt-5">
                    <Card><h5 className="fst-italic fw-bold">Your ongoing bids.</h5></Card>
                    <Card><h5 className="fst-italic fw-bold">Your ongoing auctions.</h5></Card>
                    <Card><h5 className="fst-italic fw-bold">Your previous auctions.</h5></Card>
                </div>
            </div>
        </>
    );
}
