import mongoose from "mongoose"

const auctionSchema = new mongoose.Schema({
  sellerId: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
  title: String, 
  description: String, 
  images: [{type: String}],
  startDate: Date, 
  endDate: Date,
  startingPrice: Number, 
  reservePrice: Number,
  bidHistory: [{type: mongoose.Schema.Types.ObjectId, ref:"bids"}],
  category: [{type: String}]
});

const Auction = mongoose.model("auction", auctionSchema);

export default Auction;