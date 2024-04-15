import mongoose from "mongoose"

const auctionSchema = new mongoose.Schema({
  sellerId: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
  title: String, 
  description: String, 
  images: [{type: String}],
  startDate: Number, 
  endDate: Number,
  startingPrice: Number, 
  reservePrice: Number,
  bidHistory: [{type: mongoose.Schema.Types.ObjectId, ref:"bids"}],
  category: [{type: String}]
});

const Auction = mongoose.model("auctions", auctionSchema);

export default Auction;