import NewBid from "./NewBid";
import LimitBidHistory from "./LimitBidHistory";

export default function Bidding(props) {
  const {auction} = props

  return (
    <>
      <div className="border rounded" style={{ background: "#C38D9E" }}>
        <NewBid auction={auction} />
        <LimitBidHistory auction={auction} />
      </div>
    </>
  );
}
