import { useContext, useEffect, useState } from "react";
import StyleCard from "./StyleCard.jsx";
import { GlobalContext } from "../GlobalContext";
import * as React from "react";
import { formatDateTime } from "../pages/AuctionPage.jsx";

export default function Notifications(props) {
  const { notifications, forceReRender } = props;

  const removeNotification = async (e) => {
    const notificationId = e.target.value;
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
                <h4 className="fst-italic fw-bold">
                  <div>{notification.message}</div>
                  <small>{formatDateTime(notification.date)}</small>
                  <label>
                    <input
                      type="checkbox"
                      className="ms-3"
                      value={notification._id}
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
