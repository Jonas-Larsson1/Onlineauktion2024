import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  savedAuctions: [{type: mongoose.Schema.Types.ObjectId, ref:"auctions"}]
});

const User = mongoose.model("user", usersSchema);

export default User;