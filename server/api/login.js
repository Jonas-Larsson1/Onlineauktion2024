import User from "../model/User.js"
import { getHash } from "../utilities/validation.js"

export default function (server, db) {

  server.post('/api/login', async(req, res) => {
    if (req.session.user) {
      res.status(409).json({
        message:  "There is already an user logged in"
      })
    } else {
      const user = await User.findOne({
        username: req.body.username,
        // password: req.body.password
        password: getHash(req.body.password)
      })
      
      if (user) {
        req.session.user = user._id
        res.status(201).json({
          loggedIn: user._id
        })
      } else {
        res.status(404).json({
          message: "Invalid email or password"
        })
      }
    }
  })

}