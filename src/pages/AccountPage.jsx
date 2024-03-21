import { useEffect, useState } from "react";

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
                    <div className="d-flex justify-content-center mx-auto p-2 border rounded fst-italic fw-bold w-25 p-3" style={{ background: "#C38D9E" }}>
                        <h4 className="fst-italic fw-bold">Welcome back, {user.username}.</h4>
                    </div>
                ) : (
                    <p>404</p>
                )}

                <div className="pt-5 d-flex justify-content-center" style={{ backgroundColor: "#41B3A3" }}>
                    <div className="d-flex justify-content-center mx-auto p-2 border rounded fst-italic fw-bold w-25 p-3" style={{ background: "#C38D9E" }}>
                        <h5 className="fst-italic fw-bold">Your ongoing bids.</h5>
                    </div>
                    <div className="d-flex justify-content-center mx-auto p-2 border rounded fst-italic fw-bold w-25 p-3" style={{ background: "#C38D9E" }}>
                        <h5 className="fst-italic fw-bold">Your ongoing auctions.</h5>
                    </div>
                    <div className="d-flex justify-content-center mx-auto p-2 border rounded fst-italic fw-bold w-25 p-3" style={{ background: "#C38D9E" }}>
                        <h5 className="fst-italic fw-bold">Your previous auctions.</h5>
                    </div>
                </div>
            </div>
        </>
    );
}
