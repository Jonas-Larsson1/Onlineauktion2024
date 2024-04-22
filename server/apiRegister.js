import login from "./api/login.js";
import users from "./api/users.js";
import auctions from "./api/auctions.js";
import bids from "./api/bids.js";
import notifications from "./api/notifications.js";

export default function (server, db) {

  users(server, db)
  login(server, db)
  auctions(server, db)
  bids(server, db)
  notifications(server, db)
  
}