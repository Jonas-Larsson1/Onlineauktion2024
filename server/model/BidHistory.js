import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  time: Date,
  amount: Number,
  username: String
});

const Bid = mongoose.model("bid", bidSchema);

const bidHistorySchema = new mongoose.Schema({
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "auctions" },
  bids: [{ type: [Bid.schema] }]
});

const BidHistory = mongoose.model("bidHistory", bidHistorySchema);

export default BidHistory;
