import login from "./api/login.js";
import users from "./api/users.js";

export default function (server, db) {

  users(server, db)
  login(server, db)
  
}