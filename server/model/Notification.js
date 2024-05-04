import { mongoose } from "mongoose";

const notificationSchema =  new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
    auctionId: {type: mongoose.Schema.Types.ObjectId, ref:"auctions"},
    date: Number,
    message: String,
    image: [{type: String}]
})

const Notification = mongoose.model('notifications', notificationSchema)

export default Notification