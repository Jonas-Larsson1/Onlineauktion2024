import User from "../model/User.js"

export default function (server, db) {

  server.get("/api/users", async (req, res) => {
    res.json(await User.find())
  })

}