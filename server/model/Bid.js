import mongoose from "mongoose"

const bidsSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
  time: Date,
  amount: Number
});

const Bid = mongoose.model("bid", bidsSchema);

export default Bid;