import NewBid from "./NewBid";
import LimitBidHistory from "./LimitBidHistory";

export default function Bidding() {
  return (
    <>
      <div className="p-2 border rounded" style={{ background: "#C38D9E" }}>
        <NewBid />
        <LimitBidHistory />
      </div>
    </>
  );
}
