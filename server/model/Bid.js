import mongoose from "mongoose"

const bidSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
  time: Date,
  amount: Number
});

const Bid = mongoose.model("bid", bidSchema);

export default Bid;