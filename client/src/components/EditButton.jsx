import React from "react";
import { Link } from "react-router-dom";

const EditButton = ({ itemId }) => {
    return (
        <Link to={`/EditAuction/${itemId}`} className="d-flex justify-content-center align-items-center border rounded" style={{ width: "50px", height: "50px", background: "#C38D9E", marginTop: "-25px" }}>
            <img src="/src/assets/edit.png" alt="Edit auction" height="30px" />
        </Link>
    );
}

export default EditButton;
