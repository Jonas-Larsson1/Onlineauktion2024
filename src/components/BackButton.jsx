import React from "react";
import { Link } from "react-router-dom";

export default function BackButton() {
    return (<>
        <div className="d-flex justify-content-center align-items-center mt-5 border rounded mx-5" style={{ width: "70px", height: "70px", background: "#C38D9E" }}>
            <Link to="/AccountPage">
                <img src="/src/assets/goback.png" alt="Go back" height="50px" />
            </Link>
        </div>
    </>);
}
