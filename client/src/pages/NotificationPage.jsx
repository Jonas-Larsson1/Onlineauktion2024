import { useEffect, useState } from "react";
import Notifications from "../components/Notifications.jsx";
import Loading from "../components/Loading.jsx";
import { useNavigate } from "react-router-dom";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [render, forceRender] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch("/api/notifications");
      const result = await response.json();

      setNotifications(result)
      setLoading(false)
    };

    fetchNotifications();
  }, [render]);

  const forceReRender = () => {
    forceRender((prev) => !prev);
    navigate('/notifications')
  }

  return (
    <>
    <Loading loading={loading} />
      {notifications ? (
        <>
          <h2 className="text-center my-4 fst-italic fw-bold">Your notifications: </h2>
          <div className="flex justify-content-center " style={{ maxWidth: "70vw", marginLeft: "auto", marginRight: "auto", marginBottom: "100px" }}>
            <div className="d-flex flex-row mx-3 px-3 mb-5" style={{ flexWrap: 'wrap' }}>

            <Notifications
              className="mx-5"
              notifications={notifications} forceReRender={forceReRender}
              />
          </div>
          </div>
        </>
      ) : (
        "nothing here"
      )}
    </>
  );
}
