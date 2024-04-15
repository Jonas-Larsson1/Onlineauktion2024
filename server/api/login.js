import User from "../model/User.js"
import { getHash } from "../utilities/validation.js"

export default function (server, db) {

  server.get('/api/login', async (req, res) => {
    if (req.session.user) {
      res.status(200).json({
        loggedIn: req.session.user
      })
    } else {
      res.status(200).json({
        loggedIn: false
      })
    }
  })

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

  server.delete('/api/login', async(req, res) => {
    if (req.session.user) {
      req.session.destroy()
      res.status(200).json({
        message: "Succesfully logged out"
      })
    } else {
      res.status(404).json({
        message: "There is no user logged in"
      })
    }
  })

}