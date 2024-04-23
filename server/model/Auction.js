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
  paid: { type: Boolean, default: 'false' },
  // bidHistory: [{type: mongoose.Schema.Types.ObjectId, ref:"bids"}],
  bidHistory: [{type: mongoose.Schema.Types.Mixed }],
  category: [{type: String}]
});

const Auction = mongoose.model("auctions", auctionSchema);

export default Auction;