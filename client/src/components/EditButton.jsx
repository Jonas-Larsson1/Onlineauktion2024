import React from "react";
import { Link } from "react-router-dom";

const EditButton = ({ itemId }) => {
    return (
        <Link to={`/EditAuction/${itemId}`} className="d-flex justify-content-center align-items-center mt-5 border rounded mx-5" style={{ width: "50px", height: "50px", background: "#C38D9E" }}>
            <img src="/src/assets/edit.png" alt="Edit auction" height="30px" />
        </Link>
    );
}

export default EditButton;
