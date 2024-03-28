import { Table } from 'react-bootstrap'
import { formatDateTime } from '../pages/AuctionPage'
import { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

export default function BidHistory() {
  // const { bidHistory } = props.auction

  const { auction } = useContext(GlobalContext)
  const bidHistory = auction.bidHistory

  bidHistory.sort((a, b) => new Date(b.time) - new Date(a.time))

  const myfunction = () => {
    
  }

  return <>
    <Table striped bordered hover variant="dark" size="sm">
      <thead>
        <tr>
          <th>Bidding history</th>
          <th>User</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {bidHistory.map((bid, index) => {
          return <tr key={index}>
            <td>{formatDateTime(bid.time)}</td>
            <td>{bid.userId}</td>
            <td>{bid.amount}</td>
          </tr>
        })}
      </tbody>
    </Table>
  </>
}
