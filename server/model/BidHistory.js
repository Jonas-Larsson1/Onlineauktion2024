import mongoose from "mongoose";
import Bid from "./Bid";

const bidHistorySchema = new mongoose.Schema({
    auctionId: {type: mongoose.Schema.Types.ObjectId, ref:"auctions"},
    bids: [{type: [Bid.schema]}]
    });

const BidHistory = mongoose.model("bidHistory", bidHistorySchema); 

export default BidHistory;