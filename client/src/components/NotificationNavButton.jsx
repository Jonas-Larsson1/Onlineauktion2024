import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"

const NotificationNavButton = () => {
  const [notificationCount, setNotificationCount] = useState(null)
  let location = useLocation()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/notifications')
      
      if (response.ok) {
        const result = await response.json()
        setNotificationCount(result.length)
      }
    }

    getData()

  }, [location])

  return <>
    <button className="navbar-btn mx-2 text-decoration-none text-secondary position-relative" >
    {notificationCount > 0 ?
      <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">
        {notificationCount}
      </Badge>
    : <></>}
      <Link to="/notifications">
        <img src="/src/assets/notification.png" alt="notifications" height="40px" />
      </Link>
    </button>
  </>
}

export default NotificationNavButton