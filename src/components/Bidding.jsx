import NewBid from "./NewBid";
import LimitBidHistory from "./LimitBidHistory";

export default function Bidding(props) {
  const { auction, updateAuction} = props

  console.log("bidding rendered")
  return (
    <>
      <div className="border rounded" style={{ background: "#C38D9E" }}>
        <NewBid auction={auction} updateAuction={updateAuction}/>
        <LimitBidHistory auction={auction} />
      </div>
    </>
  );
}
