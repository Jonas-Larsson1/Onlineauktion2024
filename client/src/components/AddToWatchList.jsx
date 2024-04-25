import { Button, Form } from "react-bootstrap"
import { GlobalContext } from "../GlobalContext"
import { useContext, useState, useEffect } from "react"

export default function AddToWatchList (props) {
  const { auction } = props
  const { loggedIn, isCreator } = useContext(GlobalContext)
  const [ user, setUser ] = useState()
  const [ savedByUser, setSavedByUser  ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/user/${loggedIn}`);
      const result = await response.json();

      setUser(result);
    };

    getData();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.savedAuctions.includes(auction._id)) {
        setSavedByUser(true)
      }
    }
  }, [user, savedByUser])

  const addToWatchList = async (event) => {
    event.preventDefault()

    if (!user.savedAuctions.includes(auction._id)) {
      user.savedAuctions.push(auction._id)
      setSavedByUser(true)
      
    } else {
      const savedAuctionIndex = user.savedAuctions.indexOf(auction._id)
      user.savedAuctions.splice(savedAuctionIndex, 1)
      setSavedByUser(false)
    }
    
    const response = await fetch(`/api/user/${loggedIn}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })

    if (response.ok) {
      // gör nånting
    } else {
      // gör nått annat
    }
  }

  return <>
    <Form onSubmit={addToWatchList}>
      <Button type="submit" variant="secondary" className="btn-sm" disabled={isCreator ? true : false}>
        {!savedByUser ? "Add to your saved auctions" : "Remove from your saved auctions"}
      </Button>
    </Form>
  </>
}