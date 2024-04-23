import { useEffect, useState } from "react";
import Notification from "../components/Notification.jsx";
import StyleCard from "../components/StyleCard.jsx";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState([]);
  const [fetched, setFetched] = useState(false)

  useEffect(() => {



      const fetchNotifications = async () => {
        if(!fetched){
        const response = await fetch("/api/notifications");
        const result = await response.json();
        setNotifications(result)
        setFetched(true)
        
        for(let i = 0; i < result.length; i++){
          
          setMessage((prev) => [...prev,result[i]])
          
        }
      }
      else{
        return null
      }
      };
      
    fetchNotifications();
  }, []);

  return (
    <>
      {notifications ? (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <div className="w-25">
            <StyleCard>
              <h4 className="fst-italic fw-bold">Your notifications: </h4>
            </StyleCard>



                <Notification
                  message={message}
                  notifications={notifications}
                />
            
          </div>
        </div>
      ) : (
        "nothing here"
      )}
    </>
  );
}
