import { useState } from "react";
import StyleCard from "./StyleCard.jsx";
import { Card } from "react-bootstrap";
import * as React from "react";
import { formatDateTime } from "../pages/AuctionPage.jsx";
import { Link } from "react-router-dom";

export default function Notifications(props) {
  const { notifications, forceReRender } = props;
  const [isChecked, setIsChecked] = useState(false)

  const removeNotification = async (e) => {
    const notificationId = e.target.value;
    setIsChecked(isChecked)
    const response = await fetch(`/api/notifications/${notificationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    forceReRender();
  };


  
  return (
    <>
      {notifications
        ? notifications.map((notification, index) => {
            return (
              <StyleCard key={index}>
                <h4 className="fst-italic fw-bold" style={{display: "flex", alignItems: "center" }}>
                <Card.Img   src={notification.image[0]} style={{ width: "6rem", objectFit: "cover", marginRight: "2rem"}} />
                  <Link to={`/AuctionPage/${notification.auctionId}`}> {notification.message}  </Link>
                  <small>{formatDateTime(notification.date)}</small>
                  <label>
                    <input
                      type="checkbox"
                      className="ms-3"
                      value={notification._id}
                      checked={isChecked}
                      onChange={removeNotification}
                    />
                    Mark as read
                  </label>
                </h4>
              </StyleCard>
            );
          })
        : ""}
    </>
  );
}
