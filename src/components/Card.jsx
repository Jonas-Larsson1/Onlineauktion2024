import React from "react";

const Card = ({ children }) => {
  return (

      <div className="d-flex justify-content-center mx-auto border rounded w-25 p-3 " style={{ background: "#C38D9E" }}>
        {children}
      </div>

  );
};

export default Card;