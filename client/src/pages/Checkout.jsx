import { useEffect, useState } from "react"
import { Card, Button } from 'react-bootstrap';
import StyleCard from "../components/StyleCard";
import ListCard from "../components/ListItem";

export default function Checkout () {
  const [wonAuctions, setWonAuctions] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      const req = await fetch('/api/wonAuctions')
      const res = await req.json()
      setWonAuctions(res)
    }

    getData()
  }, [])

  return <>
    <h2>Won Auctions</h2>
    {wonAuctions.map((auction, index) => (
    <StyleCard key={index}>
      <ListCard item={auction} />
    </StyleCard>
    ))}
  </>
}