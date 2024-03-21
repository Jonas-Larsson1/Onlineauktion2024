import BidHistory from "./BidHistory";
import NewBid from "./NewBid";

export default function Bidding() {
  return <>
    <div className="p-2 border rounded" style={{background: "#C38D9E"}}>
      <NewBid />
      <BidHistory />
    </div>
  </>
}