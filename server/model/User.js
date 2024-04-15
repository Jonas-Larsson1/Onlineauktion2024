import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("user", usersSchema);

export default User;