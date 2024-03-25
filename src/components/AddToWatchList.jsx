import { Button, Form } from "react-bootstrap"
import { GlobalContext } from "../GlobalContext"
import { useContext, useState, useEffect } from "react"

export default function AddToWatchList () {
  const { auction, loggedIn } = useContext(GlobalContext)
  const [ user, setUser ] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/users/${loggedIn}`);
      const result = await response.json();

      setUser(result);
    };

    getData();
  }, []);

  const addToWatchList = async (event) => {
    event.preventDefault()

    user.savedAuctions.push(auction.id)

    const response = await fetch(`/api/users/${loggedIn}`, {
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
      <Button type="submit" variant="secondary" className="btn-sm">
        Add to watchlist
      </Button>
    </Form>
  </>
}