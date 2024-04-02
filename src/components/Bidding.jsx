import NewBid from "./NewBid";
import LimitBidHistory from "./LimitBidHistory";

export default function Bidding() {
  return (
    <>
      <div className="border rounded" style={{ background: "#C38D9E" }}>
        <NewBid />
        <LimitBidHistory />
      </div>
    </>
  );
}
